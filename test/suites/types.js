var t = casper.test,
    baseUrl = casper.baseUrl;

casper.start();

t.assertResourceType = function(module, type, index) {
    index = index || 0;
    var rtype = casper.evaluate(function(module, index) { 
        return awld.moduleMap[module].resources[index].type;
    }, { module: module, index: index });
    t.assertEquals(rtype, type, 'Module "' + module + '" type is "' + type + '"');
};

casper
    .describe("Types > Module defaults")
    .thenOpen(baseUrl + 'test.html')
    .waitUntilLoaded()
    .then(function() {
        t.assertResourceType('loc/lccn', 'dc:BibliographicResource');
        t.assertResourceType('pleiades/place', 'dc:Location');
    });
    
casper
    .describe("Types > From markup")
    .thenOpen(baseUrl + 'test.html')
    .waitUntilLoaded()
    .then(function() {
        t.assertResourceType('wikipedia/page', 'dcmi:PhysicalObject');
        t.assertResourceType('wikipedia/page', 'skos:Concept', 1);
        t.assertResourceType('perseus/smith', 'dc:Location');
    });
    
casper
    .describe("Types > From module processing")
    .thenOpen(baseUrl + 'test.html')
    .waitUntilLoaded()
    .then(function() {
        t.assertUriLoaded('http://nomisma.org/id/athens', 'Athens');
        t.assertResourceType('nomisma/nomisma', 'dc:Location');
    });

casper.run(function() {
    t.done();
});