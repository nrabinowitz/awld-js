/*!
 * Copyright (c) 2012, Institute for the Study of the Ancient World, New York University
 * Licensed under the BSD License (see LICENSE.txt)
 * @author Nick Rabinowitz
 */

// removed in production by uglify
if (typeof DEBUG === 'undefined') {
    DEBUG = true;
    VERSION = 'debug';
    BASE_URL = '../../src/';
    JQUERY_PATH = 'jquery/jquery-1.7.2.min';
}

(function(window) {
    DEBUG && console.log('AWLD.js loaded');
    
    /**
     * @name awld
     * @namespace
     * Root namespace for the library
     */
    var awld = {},
        config = {
            baseUrl: BASE_URL,
            modulePath: 'modules/',
            libPath: 'lib/',
            paths: {}
        };
        
    /**
     * @type String
     * Version number
     */
    awld.version = VERSION;
    
    /**
     * @function
     * Set configuration options for the library.
     * @param {Object} opts             Options to set
     * @param {String} [opts.baseUrl]       Base URL for dependencies; library and module 
     *                                      dependencies will be loaded relative to this URL. 
     *                                      See http://requirejs.org/docs/api.html#config for
     *                                      more information.
     * @param {String} [opts.modulePath]    Path for modules, relative to baseUrl
     * @param {String} [opts.libPath]       Path for 3rd-party libraries, relative to baseUrl
     * @param {Object} [opts.paths]         Special path definitions for various dependencies.
     *                                      See http://requirejs.org/docs/api.html#config for
     *                                      more information.
     */
    awld.config = function(opts) {
        for (var key in opts)
            config[key] = opts[key];
    };
    
    /**
     * @type Object
     * Map of loaded modules
     */
    awld.modules = {};
    
    /**
     * @function
     * Initialize the library, loading and running modules based on page content
     */
    awld.init = function() {
        DEBUG && console.log('Initializing library');
        
        var jQuery = window.jQuery,
            // check for old versions of jQuery
            oldjQuery = jQuery && !!jQuery.fn.jquery.match(/^1\.[0-4]/),
            paths = config.paths,
            libPath = config.libPath,
            modulePath = config.modulePath,
            onload = config.onLoad,
            localJqueryPath = libPath + JQUERY_PATH,
            noConflict;
        
        
        // check for jQuery 
        if (!jQuery || oldjQuery) {
            // load if it's not available or doesn't meet min standards
            paths['jquery'] = localJqueryPath;
            noConflict = oldjQuery;
        } else {
            // register the current jQuery
            define('jquery', [], function() { return jQuery });
        }
        
        // set up require
        require.config({
            baseUrl: config.baseUrl,
            paths: paths 
        });
        
        // load registry and initialize modules
        require(['jquery', 'registry'], function($, registry) {
        
            // deal with jQuery versions if necessary
            if (noConflict) $.noConflict(true);
            
            // load machinery
            var toLoad = [],
                loaded = 0,
                loadMgr = function(moduleName, module) {
                    DEBUG && console.log('Loaded module: ' + moduleName);
                    awld.modules[moduleName] = module;
                    // check for complete
                    if (++loaded == toLoad.length) {
                        DEBUG && console.log('All modules loaded');
                        awld.loaded = true;
                        // initialize core
                        require([modulePath + 'core'], function(core) {
                            core.init(awld.modules);
                        });
                    }
                }
            
            // wrap in ready, just in case, as this looks through the DOM
            $(function() {
            
                // look for modules to initialize
                $.each(registry, function(uriBase, moduleName) {
                    // look for links with this URI base
                    var $links = $('a[href^="' + uriBase + '"]');
                    if ($links.length) {
                        DEBUG && console.log('Found links for module: ' + moduleName);
                        toLoad.push(moduleName);
                        // run init
                        module.init && module.init();
                    }   
                });
                
                // initialize identified modules
                toLoad.forEach(function(moduleName) {
                    require([modulePath + moduleName], function(module) {
                        loadMgr(moduleName, module);
                    });
                });
                
            });
            
        });
    }
    
    window.awld = awld;
    
})(window);