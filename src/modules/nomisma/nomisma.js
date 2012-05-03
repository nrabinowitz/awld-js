// Module: Nomisma.org API

define(['jquery'], function($) {
    return {
        name: 'Nomisma.org Entities',
        dataType: 'xml',
        // data URI is the same
        corsEnabled: true,
        parseData: function(xml) {
            var getText = awld.accessor(xml);
            return {
                name: getText('[property="skos:prefLabel"]'),
                description: getText('[property="skos:definition"]'),
                latlon: getText('[property="gml:pos"]').split(' '),
                related: getText('[rel*="skos:related"]', 'href')
            };
        },
        getType: function(xml) {
            var map = {
                    'roman_emperor': 'dc:Agent',
                    'ruler': 'dc:Agent',
                    'authority': 'dc:Agent',
                    'nomisma_region': 'dc:Location',
                    'hoard': 'dc:Location',
                    'mint': 'dc:Location',
                    'material': 'dcmi:PhysicalObject'
                },
                type = $('[typeof]', xml).first().attr('typeof');
            if (type) return map[type];
        }
    };
});