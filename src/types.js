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
    var typeNames = {
            'dc:Agent': 'Person',
            'dc:Location': 'Place',
            'dc:BibliographicResource': 'Bibliographic Reference',
            'dcmi:Event': 'Event',
            'dcmi:Text': 'Text',
            'dcmi:PhysicalObject': 'Physical Object'
        },
        types = keys(typeNames),
        pluralNames = {},
        typeMap = {
            'foaf:Person': 'dc:Agent'
        },
        map = function(name) {
            return typeMap[name] || name;
        }
        name = function(type) {
            return typeNames[map(type)];
        },
        pluralName = function(type) {
            type = map(type);
            return type in pluralNames ? typeNames[type] : typeNames[type] + 's';
        };
    
    return {
        types: types,
        map: map,
        name: name,
        pluralName: pluralName
    }
});