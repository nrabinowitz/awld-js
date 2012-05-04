// Core UI elements: index, popup

define('ui',['jquery', 
             'handlebars',
             'types',
             'text!ui/core.css',
             // note that .html files are actually .html.js files
             'ui/index.html',
             'ui/index-grp.html', 
             'text!ui/pop.html', 
             'ui/details.html'], 
    function($, Handlebars, types, 
             coreCss, indexTemplate, groupTemplate, 
             popHtml, detailTemplate) {
             
        var modules,
            $pop,
            popTimer;
            
        // make the group template available
        Handlebars.registerPartial('grp', groupTemplate);
            
        // utility - make a map of common resource data
        function resMap(res) {
            var data = res.data || {};
            return $.extend({}, data, { 
                href: res.href, 
                type: types.label(res.type),
                name: res.name(),
                haslatlon: !!data.latlon
            });
        }
        
        // load stylesheet
        function loadStyles(styles) {
            // put in baseUrl (images, etc)
            styles = styles.replace(/\/\/\//g, awld.baseUrl);
            var $style = $('<style>' + styles + '</style>').appendTo('head');
        }
        
        // create the index of known references
        function makeIndex() {
            // get resources grouped by module
            var mdata = modules.map(function(module) {
                    return { 
                        name: module.name,
                        res: module.resources.map(resMap)
                    };
                }),
                // get all resources
                resources = mdata.reduce(function(agg, d) {
                    return agg.concat(d.res); 
                }, []),
                count = resources.length,
                plural = count != 1 ? 's' : '',
                // get resources grouped by type
                tdata = [],
                // XXX: what about types set after resource load?
                typeGroups = resources.reduce(function(agg, res) {
                    var type = res.type;
                    if (!(type in agg))
                        agg[type] = tdata[tdata.length] = { name: type, res: [] };
                    agg[type].res.push(res);
                    return agg;
                }, {}),
                // render the index
                $index = $(indexTemplate({
                    c: count,
                    p: plural,
                    m: mdata,
                    t: tdata.sort(function(a,b) { return a.name > b.name ? 1 : -1 })
                })),
                // cache DOM refs
                $panel = $('.aw-panel', $index)
                    .add('hr', $index),
                $content = $panel.find('.aw-group');
                
            // add toggle handler
            $('span.refs', $index).toggle(function() {
                hidePopup();
                $panel.show();
                $content.slideToggle();
            }, function() {
                $content.slideToggle(function() {
                    $panel.hide();
                });
            });
            
            // update names when loaded
            modules.forEach(function(module) {
                module.resources.forEach(function(res) {
                    res.ready(function() {
                        if (res.data)
                            $index.find('a[href="' + res.href + '"]').text(res.name());
                    });
                });
            });
            return $index;
        }
        
        // add the index if the placeholder is found
        function addIndex(selector) {
            var $el = $(selector).first();
            if ($el.length) $el.append(makeIndex());
        }
        
        // show a pop-up window with resource details.
        // Elements adapted from Twitter Bootstrap v2.0.3
        // https://github.com/twitter/bootstrap
        // Copyright 2012 Twitter, Inc
        // Licensed under the Apache License v2.0
        // http://www.apache.org/licenses/LICENSE-2.0
        // Designed and built with all the love in the world @twitter by @mdo and @fat.
        function showPopup($ref, content) {
            // get window
            $pop = $pop || $(popHtml);
            // set content
            function setContent(html) {
                $('.awld-content', $pop)
                    .html(html);
                $('.awld-pop-inner', $pop)
                    .toggleClass('loading', !html);
            }
            // clear previous content
            setContent('');
            if ($.isFunction(content)) {
                // this is a promise; give it a callback
                content(setContent);
            } else setContent(content);
            // set up position
            $pop.remove()
                .css({ top: 0, left: 0, display: 'block' })
                .appendTo(document.body);
            // determine position
            var pos = $.extend({}, $ref.offset(), {
                    width: $ref[0].offsetWidth,
                    height: $ref[0].offsetHeight
                }),
                actualWidth = $pop[0].offsetWidth,
                actualHeight = $pop[0].offsetHeight,
                winw = $(window).width(),
                padding = 5,
                hpos = pos.left + pos.width / 2 - actualWidth / 2,
                vpos = pos.top + pos.height / 2 - actualHeight / 2,
                // set position styles
                posStyle = hpos < padding ? // too far left?
                    // position: right
                    {placement: 'right', top: vpos, left: pos.left + pos.width} :
                        hpos + actualWidth + padding > winw ? // too far right?
                            // position: left
                            {placement: 'left', top: vpos, left: pos.left - actualWidth} :
                                pos.top - actualHeight < padding + window.scrollY ? // too far up?
                                    // position: bottom
                                    {placement: 'bottom', top: pos.top + pos.height, left: hpos} :
                                        // otherwise, position: top
                                        {placement: 'top', top: pos.top - actualHeight, left: hpos};
                                        
            $pop.css(posStyle)
                .removeClass('top bottom left right')
                .addClass(posStyle.placement);
        }
        
        function hidePopup() {
            if ($pop) $pop.remove();
        }
        
        // add functionality to show popups on hover
        function addPopup($ref, content) {
            var popupClose = awld.popupClose;
            if (popupClose == 'manual') {
                // require manual close
                $ref.mouseover(function() {
                    showPopup($ref, content);
                });
            } else {
                // automatically close after a given delay
                var clearTimer = function() {
                        if (popTimer) clearTimeout(popTimer);
                        popTimer = 0;
                    },
                    startTimer = function() {
                        clearTimer();
                        popTimer = setTimeout(function() {
                            hidePopup();
                            popTimer = 0;
                        }, popupClose);
                    };
                // set hover handler
                $ref.hover(function() {
                    clearTimer();
                    showPopup($ref, content);
                    // set handlers on the popup
                    $pop.bind('mouseover', clearTimer)
                        .bind('mouseleave', function() {
                            clearTimer();
                            hidePopup();
                            $pop.unbind('mouseleave mouseover');
                        });
                }, function() {
                    startTimer();
                });
            }
        }
        
        // simple detail view
        function detailView(res) {
            return detailTemplate(resMap(res));
        }
        
        // initialize core
        function init(loadedModules) {
            modules = loadedModules;
            if (modules.length) loadStyles(coreCss);
            addIndex('.awld-index');
        }
        
        return { 
            name: 'core',
            loadStyles: loadStyles,
            addIndex: addIndex,
            showPopup: showPopup,
            hidePopup: hidePopup,
            addPopup: addPopup,
            detailView: detailView,
            init: init
        };
});