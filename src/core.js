// Core module: Displays index

define('core',['jquery', 'text!core/core.css'], function($, styles) {
    var modules;
    
    // load stylesheet
    function loadStylesheet() {
        var $style = $('<style>' + styles + '</style>').appendTo('head');
    }
    
    // create the index of known references
    function makeIndex() {
        var $index = $('<div id="awld-index" class="awld"><h1>Ancient World References</h1></div>');
        $.each(modules, function(key, module) {
            $index.append(
                $('<div class="module"><h2>' + module.name + '</h2></div>')
                    .append(
                        // create all links
                        module.$refs.map(function() {
                            return '<a href="' + $(this).attr('href') + '">' + $(this).text() + '</a>'
                        }).toArray().join('')
                    )
            );
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