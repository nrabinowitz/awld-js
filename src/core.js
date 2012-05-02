// Core module: Displays index

define('core',['jquery', 'mustache',
               'text!core/core.css', 'text!core/index.html'], 
    function($, Mustache, styles, indexTemplate) {
        var modules;
        
        // load stylesheet
        function loadStylesheet() {
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
        
        function addIndex(selector) {
            var $el = $(selector).first();
            if ($el.length) {
                loadStylesheet();
                $el.append(makeIndex());
            }
        }
        
        // initialize core
        function init(loadedModules) {
            modules = loadedModules;
            // look for index placeholder
            addIndex('.awld-index');
        }
        
        return { 
            name: 'core',
            addIndex: addIndex,
            init: init
        };
});