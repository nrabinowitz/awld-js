/*!
 * Copyright (c) 2012, Institute for the Study of the Ancient World, New York University
 * Licensed under the BSD License (see LICENSE.txt)
 * @author Nick Rabinowitz
 */

// removed in production by uglify
if (typeof DEBUG === 'undefined') {
    DEBUG = true;
    VERSION = 'debug';
    JQUERY_PATH = '../../lib/jquery/jquery-1.7.2.min';
}

(function(window) {
    DEBUG && console.log('AWLD.js loaded');
    
    /**
     * @name awld
     * @namespace
     * Root namespace for the library
     */
    var awld = {},
        jQuery = window.jQuery,
        paths = {},
        noConflict;
        
    // set version
    awld.version = VERSION;
        
    // check for jQuery 
    if (!jQuery || jQuery.fn.jquery.match(/^1\.[0-4]/)) {
        // load if it's not available or doesn't meet min standards
        paths['jquery'] = JQUERY_PATH;
        noConflict = true;
    } else {
        // register the current jQuery
        define('jquery', [], function() { return jQuery });
    }
     
    require.config({ 
        paths: paths 
    });
    
    // deal with jQuery versions if necessary
    if (noConflict) {
        require(['jquery'], function($) {
            $.noConflict(true);
        });
    }
    
    window.awld = awld;
    
})(this); 