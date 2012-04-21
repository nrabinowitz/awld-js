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
            var $index = $(Mustache.render(indexTemplate, {
                modules: modules.map(function(module) {
                    return { 
                        name: module.name,
                        resources: module.resources.map(function(res) {
                            return { href: res.href, name: res.name() }
                        })
                    }
                })
            }));
            // update names when loaded
            modules.forEach(function(module) {
                module.resources.forEach(function(res) {
                    res.ready(function() {
                        $index.find('a[href="' + res.href + '"]').text(res.name());
                    })
                })
            })
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