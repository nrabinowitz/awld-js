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
        t.assertResourceType('loc/lccn', 'citation');
        t.assertResourceType('pleiades/place', 'place');
        t.assertResourceType('worldcat/oclc', 'citation');
    });
    
casper
    .describe("Types > From markup")
    .thenOpen(baseUrl + 'test.html')
    .waitUntilLoaded()
    .then(function() {
        t.assertResourceType('wikipedia/page', 'object');
        t.assertResourceType('wikipedia/page', 'concept', 1);
        t.assertResourceType('perseus/smith', 'place');
    });
    
casper
    .describe("Types > From module processing")
    .thenOpen(baseUrl + 'test.html')
    .waitUntilLoaded()
    .then(function() {
        t.assertUriLoaded('http://nomisma.org/id/athens', 'Athens');
        t.assertResourceType('nomisma/nomisma', 'place');
    });

casper.run(function() {
    t.done();
});