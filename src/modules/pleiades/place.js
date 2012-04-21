// Module: Pleiades places

define(function() {
    return {
        name: 'Pleiades Places',
        toDataUri: function(uri) {
            return uri + '/json';
        },
        corsEnabled: true,
        // add name to data
        parseData: function(data) {
            data.name = data.title;
            return data;
        }
    }
});