// Core module: Displays index

define('core',['jquery', 'mustache',
               'text!core/core.css', 'text!core/index.html'], 
    function($, Mustache, styles, indexTemplate) {
        var modules;
        
        // abstract base class for resources
        function Resource(opts) {
            var readyHandlers = [],
                loaded = false;
            return $.extend({
                // do something when data is loaded
                ready: function(f) {
                    if (loaded) f();
                    else {
                        // XXX: WTF? How did I miss this problem?
                    }
                },
                name: opts.linkText
            }, opts);
        }
        
        // abstract base class for modules
        function Module(m) {
            var cache = {},
                noop = function() {};
            return $.extend({
                // by default, retrieve and cache all resources
                init: function() {
                    var module = this,
                        refs = module.resources = module.$refs.map(function() {
                            var $ref = $(this),
                                href = $ref.attr('href');
                            return Resource({
                                uri: module.toDataUri(href), 
                                href: href,
                                linkText: $ref.text()
                            });
                        }).toArray();
                    refs.forEach(function() {
                    });
                    if (DEBUG) console.log("Initialized " + this.name + ": " + refs.length + " references");
                },
                // translate human URI to API URI
                toDataUri: function(uri) {
                    // default: just stick .json on
                    return uri + '.json';
                },
                resourceName: noop,
                detailView: noop,
                $refs: $()
            }, m);
        }
        
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
            // init modules
            modules = loadedModules.map(Module);
            modules.forEach(function(module) { module.init() });
            // look for index placeholder
            addIndex('.awld-index');
        }
        
        return { 
            name: 'core',
            addIndex: addIndex,
            Resource: Resource,
            Module: Module,
            init: init
        };
});