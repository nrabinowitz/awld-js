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
    LIB_PATH = '../lib/';
    MODULE_PATH = 'modules/';
    JQUERY_PATH = 'jquery/jquery-1.7.2.min';
}

(function(window) {
    DEBUG && console.log('AWLD.js loaded');
    
    /**
     * @name awld
     * @namespace
     * Root namespace for the library
     */
    var awld = {};
        
    /**
     * @type String
     * Version number
     */
    awld.version = VERSION;
    
    /**
     * @type String
     * Base URL for the library; library and module dependencies will be loaded
     * relative to this URL. See http://requirejs.org/docs/api.html#config for
     * more information.
     */
    awld.baseUrl = BASE_URL;
    
    /**
     * @type Object
     * Special path definitions for various dependencies.
     * See http://requirejs.org/docs/api.html#config for
     * more information.
     */
    awld.paths = {};
    
    /**
     * @function
     * Initialize the library, loading and running modules based on page content
     */
    awld.init = function() {
        DEBUG && console.log('Initializing library');
        var jQuery = window.jQuery,
            paths = awld.paths,
            libPath = LIB_PATH,
            modulePath = MODULE_PATH,
            noConflict;
        
        // check for jQuery 
        if (!jQuery || jQuery.fn.jquery.match(/^1\.[0-4]/)) {
            // load if it's not available or doesn't meet min standards
            paths['jquery'] = libPath + JQUERY_PATH;
            noConflict = true;
        } else {
            // register the current jQuery
            define('jquery', [], function() { return jQuery });
        }
        
        // set up require
        require.config({
            baseUrl: awld.baseUrl,
            paths: paths 
        });
        
        // load registry and initialize modules
        require(['jquery', 'registry'], function($, registry) {
        
            // deal with jQuery versions if necessary
            if (noConflict) $.noConflict(true);
            
            var toLoad = []; // XXX: ['core'];
            
            // look for modules to initialize
            $.each(registry, function(uriBase, moduleName) {
                console.log(uriBase, moduleName);
                // look for links with this URI base
                if ($('a[href^="' + uriBase + '"]').length) {
                    DEBUG && console.log('Found links for module: ' + moduleName);
                    toLoad.push(moduleName);
                }   
            });
            
            // initialize identified modules
            toLoad.forEach(function(moduleName) {
                require([modulePath + moduleName], function(module) {
                    module.init(function() {
                        DEBUG && console.log('Initialized module: ' + moduleName);
                    })
                });
            });
            
        });
    }
    
    window.awld = awld;
    
})(window);

awld.init();