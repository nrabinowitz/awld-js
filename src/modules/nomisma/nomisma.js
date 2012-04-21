// Module: Nomisma.org API

define(['jquery'], function() {
    return {
        name: 'Nomisma.org Entities',
        dataType: 'xml',
        toDataUri: function(uri) {
            var id = uri.split('/').pop();
            return 'http://nomisma.org/xml/' + id + '.txt'
        },
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