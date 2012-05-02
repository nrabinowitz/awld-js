// Core module: Displays index

define('core',['jquery', 'mustache',
               'text!core/core.css', 'text!core/index.html', 'text!core/pop.html'], 
    function($, Mustache, coreStyles, indexTemplate, popTemplate) {
        var modules,
            $pop;
        
        // load stylesheet
        function loadStyles(styles) {
            // put in baseUrl (images, etc)
            styles = styles.replace(/\/\/\//g, awld.baseUrl);
            var $style = $('<style>' + styles + '</style>').appendTo('head');
        }
        
        // create the index of known references
        function makeIndex() {
            var mdata = modules.map(function(module) {
                    return { 
                        name: module.name,
                        res: module.resources.map(function(res) {
                            return { href: res.href, name: res.name() };
                        })
                    };
                }),
                count = mdata.reduce(function(agg, d) { return agg + d.res.length; }, 0),
                plural = count != 1 ? 's' : '',
                // render the index
                $index = $(Mustache.render(indexTemplate, {
                    c: count,
                    p: plural,
                    m: mdata
                })),
                // cache refs
                $panel = $('.panel', $index)
                    .add('hr', $index),
                $content = $panel.find('.module');
                
            // add toggle handler
            $('span.refs', $index).toggle(function() {
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
            $pop = $pop || $(popTemplate);
            // set content
            $('.awld-content', $pop)
                .html(content);
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
        function addPopup($ref, contentFunction) {
            var timer,
                clearTimer = function() {
                    if (timer) clearTimeout(timer);
                    timer = 0;
                },
                startTimer = function() {
                    clearTimer();
                    timer = setTimeout(function() {
                        hidePopup();
                        timer = 0;
                    }, 2000);
                };
                
            $ref.hover(function() {
                var content = contentFunction();
                if (content) {
                    clearTimer();
                    showPopup($ref, content);
                    // set handlers on the popup
                    $pop.bind('mouseover', clearTimer)
                        .bind('mouseleave', function() {
                            clearTimer();
                            hidePopup();
                            $pop.unbind('mouseleave mouseover');
                        });
                }
            }, function() {
                startTimer();
            });
        }
        
        // initialize core
        function init(loadedModules) {
            modules = loadedModules;
            if (modules.length) loadStyles(coreStyles);
            addIndex('.awld-index');
        }
        
        return { 
            name: 'core',
            loadStyles: loadStyles,
            addIndex: addIndex,
            showPopup: showPopup,
            hidePopup: hidePopup,
            addPopup: addPopup,
            init: init
        };
});