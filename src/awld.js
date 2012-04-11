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
}

(function(window) {
    if (DEBUG) console.log('AWLD.js loaded');
    
    /**
     * @name awld
     * @namespace
     * Root namespace for the library
     */
    var awld = {};
    
    /**
     * @type String
     * Base URL for dependencies; library and module 
     * dependencies will be loaded relative to this URL. 
     * See http://requirejs.org/docs/api.html#config for
     * more information.
     */
    awld.baseUrl = BASE_URL;
    
    /**
     * @type String
     * Path for modules, relative to baseUrl
     */
    awld.modulePath = 'modules/';
    
    /**
     * @type String
     * Path for libraries, relative to baseUrl
     */
    awld.libPath = 'lib/';
    
    /**
     * @type Object
     * Special path definitions for various dependencies.
     * See http://requirejs.org/docs/api.html#config for
     * more information.
     */
    awld.paths = {};
        
    /**
     * @type String
     * Version number
     */
    awld.version = VERSION;
    
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
        if (DEBUG) console.log('Initializing library');
        
        var jQuery = window.jQuery,
            // check for old versions of jQuery
            oldjQuery = jQuery && !!jQuery.fn.jquery.match(/^1\.[0-4]/),
            paths = awld.paths,
            libPath = awld.libPath,
            modulePath = awld.modulePath,
            onload = awld.onLoad,
            localJqueryPath = libPath + 'jquery/jquery-1.7.2.min',
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
            baseUrl: awld.baseUrl,
            paths: paths 
        });
        
        // cache busting for development
        if (DEBUG) {
            require.config({
                urlArgs: "bust=" +  (new Date()).getTime()
            });
        } 
        
        // load registry and initialize modules
        require(['jquery', 'registry'], function($, registry) {
        
            // deal with jQuery versions if necessary
            if (noConflict) $.noConflict(true);
            
            // load machinery
            var target = 0,
                loaded = 0,
                modules = awld.modules,
                loadMgr = function(moduleName, module) {
                    if (DEBUG) console.log('Loaded module: ' + moduleName);
                    modules[moduleName] = module;
                    // check for complete
                    if (++loaded == target) {
                        if (DEBUG) console.log('All modules loaded');
                        awld.loaded = true;
                        // initialize core
                        require([modulePath + 'core/core'], function(core) {
                            awld.core = core;
                            core.init(modules);
                        });
                    }
                }
            
            // wrap in ready, just in case, as this looks through the DOM
            $(function() {
            
                // look for modules to initialize
                $.each(registry, function(uriBase, moduleName) {
                    // look for links with this URI base
                    var $refs = $('a[href^="' + uriBase + '"]');
                    if ($refs.length) {
                        if (DEBUG) console.log('Found links for module: ' + moduleName);
                        target++;
                        // load module
                        require([modulePath + moduleName], function(module) {
                            // add cached references
                            module.$refs = $refs;
                            // run init
                            module.init();
                            // update manager
                            loadMgr(moduleName, module);
                        });
                    }   
                });
                
            });
            
        });
    }
    
    window.awld = awld;
    
})(window);