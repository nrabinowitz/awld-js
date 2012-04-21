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
    // cache busting for development
    require.config({
        urlArgs: "bust=" +  (new Date()).getTime()
    });
}

(function(window) {
    if (DEBUG) console.log('AWLD.js loaded');
    
    /**
     * @name awld
     * @namespace
     * Root namespace for the library
     */
    var awld = {
        /**
         * @type String
         * Base URL for dependencies; library and module 
         * dependencies will be loaded relative to this URL. 
         * See http://requirejs.org/docs/api.html#config for
         * more information.
         */
        baseUrl: BASE_URL,
        
        /**
         * @type String
         * Path for modules, relative to baseUrl
         */
        modulePath: 'modules/',
        
        /**
         * @type String
         * Path for libraries, relative to baseUrl
         */
        libPath: 'lib/',
        
        /**
         * @type Object
         * Special path definitions for various dependencies.
         * See http://requirejs.org/docs/api.html#config for
         * more information.
         */
        paths: {},
        
        /**
         * @type String
         * Version number
         */
        version: VERSION,
        
        /**
         * @type Object[]
         * Array of loaded modules
         */
        modules: [],
        
        /**
         * @type Object
         * Map of loaded modules, keyed by module path
         */
        moduleMap: {},
        
        /**
         * @type Boolean
         * Whether to auto-load data for all identified URIs
         */
        autoLoad: true
    };
    
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
        
        // add mustache - better way to add libraries?
        paths['mustache'] = libPath + 'mustache.0.5.0-dev';
        
        // set up require
        require.config({
            baseUrl: awld.baseUrl,
            paths: paths 
        });
        
        // load registry and initialize modules
        require(['jquery', 'registry', 'core'], function($, registry, core) {
        
            // deal with jQuery versions if necessary
            if (noConflict) $.noConflict(true);
            
            // add a jquery-dependent utility
            awld.accessor = function(xml) {
                $xml = $(xml);
                return function(selector, attr) {
                    var text = $(selector, $xml).map(function() {
                            return attr ? $(this).attr(attr) : $(this).text();
                        }).toArray();
                    return text.length > 1 ? text : text[0];
                }
            }
            
            /**
             * @name awld.Resource
             * @class
             * Base class for resources
             */
            var Resource = awld.Resource = function(opts) {
                var readyHandlers = [],
                    module = opts.module,
                    dataType = module.dataType,
                    jsonp = dataType == 'jsonp',
                    cors = module.corsEnabled,
                    parseData = module.parseData,
                    fetching = false,
                    loaded = false,
                    yqlUrl = function(uri) {
                        return 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20' + dataType 
                            +'%20where%20url%3D%22' + uri + '%22&format=' + dataType 
                            + '&diagnostics=false&callback=?'
                    };
                return $.extend({
                    // do something when data is loaded
                    ready: function(f) {
                        if (loaded) f();
                        else {
                            readyHandlers.push(f);
                            this.fetch();
                        }
                    },
                    // load data for this resource
                    fetch: function() {
                        // don't allow multiple reqs
                        if (!fetching) {
                            fetching = true;
                            var res = this,
                                parseResponse = parseData,
                                options = $.extend({
                                    url: res.uri,
                                    dataType: dataType,
                                    success: function(data) {
                                        // save data
                                        res.data = parseResponse(data);
                                        // invoke any handlers
                                        readyHandlers.forEach(function(f) { 
                                            f(res);
                                        });
                                        loaded = true;
                                        if (DEBUG) console.log('Loaded resource', res.uri);
                                    },
                                    error: function() {
                                        if (DEBUG) console.log('Resource request failed', arguments);
                                    }
                                }, module.ajaxOptions),
                                // make a request using YQL as a JSONP proxy
                                makeYqlRequest = function() {
                                    options.url = yqlUrl(options.url);
                                    options.dataType = 'jsonp';
                                    parseResponse = function(data) {
                                        data = data && (data.results && data.results[0] || data.query.results) || {};
                                        return parseData(data);
                                    }
                                    $.ajax(options);
                                };
                            // allow CORS to fallback on YQL
                            if (!jsonp && cors) {
                                options.error = function() {
                                    if (DEBUG) console.log('CORS fail, falling back on YQL for ' + res.uri);
                                    makeYqlRequest();
                                }
                            }
                            // make the request
                            if (jsonp || cors) $.ajax(options);
                            else makeYqlRequest();
                        }
                    },
                    name: function() {
                        return this.data && this.data.name || this.linkText;
                    }
                }, opts);
            };
            
            /**
             * @name awld.Modules
             * @class
             * Base class for modules
             */
            var Module = awld.Module = function(opts) {
                var cache = {},
                    identity = function(d) { return d },
                    noop = function() {};
                return $.extend({
                    // by default, retrieve and cache all resources
                    init: function() {
                        var module = this,
                            resources = module.resources = module.$refs.map(function() {
                                var $ref = $(this),
                                    href = $ref.attr('href');
                                return Resource({
                                    module: module,
                                    uri: module.toDataUri(href), 
                                    href: href,
                                    linkText: $ref.text()
                                });
                            }).toArray();
                        // auto load if requested
                        if (awld.autoLoad) {
                            resources.forEach(function(res) {
                                res.fetch();
                            });
                        }
                        module.initialize();
                    },
                    // translate human URI to API URI
                    toDataUri: function(uri) {
                        // default: just stick .json on
                        return uri + '.json';
                    },
                    // parse data returned from server
                    parseData: identity,
                    dataType: 'json',
                    resourceName: identity,
                    detailView: noop,
                    initialize: noop
                }, opts);
            };
            
            // load machinery
            var target = 0,
                loaded = 0,
                modules = awld.modules,
                loadMgr = function(moduleName, module) {
                    if (DEBUG) console.log('Loaded module: ' + moduleName);
                    // add to lists
                    awld.moduleMap[moduleName] = module;
                    modules.push(module);
                    // check for complete
                    if (++loaded == target) {
                        if (DEBUG) console.log('All modules loaded');
                        awld.loaded = true;
                        // init core
                        core.init(modules);
                    }
                };
            
            // wrap in ready, as this looks through the DOM
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
                            // initialize with cached references
                            module.$refs = $refs;
                            module.moduleName = moduleName;
                            module = Module(module);
                            module.init();
                            // update manager
                            loadMgr(moduleName, module);
                        });
                    }   
                });
                
            });
            
        });
    }
    
    // add to global namespace
    window.awld = awld;
    
})(window);