// Module: Nomisma.org API

define(['jquery'], function() {
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
                latlng: getText('[property="gml:pos"]').split(' '),
                related: getText('[rel*="skos:related"]', 'href')
            }
        }
    }
});