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
        function showPopover($ref, content) {
            // get position
            var pos = $.extend({}, $ref.offset(), {
                    width: $ref[0].offsetWidth,
                    height: $ref[0].offsetHeight
                }),
                constrain = function(num) {
                    return Math.max(num, 0);
                },
                // XXX: determine based on ref position
                placement = 'left',
                actualWidth, actualHeight;
            // get window
            $pop = $pop || $(popTemplate);
            // set content
            $('.awld-content', $pop)
                .html(content);
            // set up position
            $pop.remove()
                .css({ top: 0, left: 0, display: 'block' })
                .appendTo(document.body);
            actualWidth = $pop[0].offsetWidth,
            actualHeight = $pop[0].offsetHeight;
            // set position
            switch (placement) {
              case 'bottom':
                tp = {top: pos.top + pos.height, left: constrain(pos.left + pos.width / 2 - actualWidth / 2)}
                break
              case 'top':
                tp = {top: pos.top - actualHeight, left: constrain(pos.left + pos.width / 2 - actualWidth / 2)}
                break
              case 'left':
                tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
                break
              case 'right':
                tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
                break
            }
            $pop.css(tp)
                .addClass(placement);
            console.log($pop);
        }
        
        function hidePopover() {
            if ($pop) $pop.remove();
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
            showPopover: showPopover,
            hidePopover: hidePopover,
            init: init
        };
});