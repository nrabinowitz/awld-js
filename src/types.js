// mapping and identification of resource types
define('types', [], function() {
    // utility: get keys
    function keys(obj) {
        var keys = [], key;
        for (key in obj) 
            if (obj.hasOwnProperty(key)) 
                keys[keys.length] = key;
        return keys;
    }

    // XXX: deal with xmlns?
    
    // set up types
    var typeLabels = {
            'dc:Agent': 'Person',
            'dc:Location': 'Place',
            'dc:BibliographicResource': 'Bibliographic Reference',
            'dcmi:Event': 'Event',
            'dcmi:Text': 'Text',
            'dcmi:PhysicalObject': 'Physical Object'
        },
        types = keys(typeLabels),
        pluralLabels = {},
        typeMap = {
            'foaf:Person': 'dc:Agent'
        },
        map = function(name) {
            return typeMap[name] || name;
        }
        label = function(type) {
            return typeLabels[map(type)];
        },
        pluralLabel = function(type) {
            type = map(type);
            return type in pluralLabels ? typeLabels[type] : typeLabels[type] + 's';
        };
    
    return {
        types: types,
        map: map,
        label: label,
        pluralLabel: pluralLabel
    }
});