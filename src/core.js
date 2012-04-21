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
            var view = { modules: [] };
            modules.forEach(function(module) {
                view.modules.push({ 
                    name: module.name,
                    resources: module.resources
                });
            });
            return Mustache.render(indexTemplate, view);
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