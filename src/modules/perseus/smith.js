// Module: Perseus: Smith's "Dictionary of Greek and Roman biography and mythology"

define(['jquery'], function($) {
    return {
        name: 'Perseus: References in Smith\'s "Greek and Roman biography and mythology"',
        dataType: 'xml',
        // data format determined through content negotiation
        toDataUri: function(uri) { return uri },
        corsEnabled: true,
        // get values from the returned XML
        parseData: function(xml) {
            function getText(selector) {
                var text = $(selector, xml).map(function() {
                        return $(this).text();
                    }).toArray();
                return text.length > 1 ? text : text[0];
            }
            var names = getText('head persName');
            return {
                names: names,
                name: names.join(', or '),
                description: getText('p')
            }
        }
    }
});