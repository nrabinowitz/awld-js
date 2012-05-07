var t = casper.test,
    baseUrl = casper.baseUrl;

casper.start();

casper
    .describe("Modules > Load based on links")
    .thenOpen(baseUrl + 'test.html')
    .waitUntilLoaded()
    .then(function() {
        t.assertLoadCount(6);
        t.assertModuleLoaded('pleiades/place');
        t.assertModuleLoaded('loc/lccn');
        t.assertModuleLoaded('perseus/smith');
        t.assertModuleLoaded('nomisma/nomisma');
        t.assertModuleLoaded('wikipedia/page');
        t.assertModuleLoaded('worldcat/oclc');
    });
    
casper
    .describe("Modules > Load based on links, custom setup")
    .thenOpen(baseUrl + 'test-custom.html')
    .waitUntilLoaded()
    .then(function() {
        t.assertLoadCount(2);
        t.assertModuleLoaded('pleiades/place');
        t.assertModuleLoaded('customModule');
        t.assertUriFound('custom-api/resource-1.json');
        t.assertUriLoaded('custom-api/resource-1.json', 'Custom Resource');
    });

casper
    .describe("Modules > Load based on links, custom setup, init(config)")
    .thenOpen(baseUrl + 'test-custom2.html')
    .waitUntilLoaded()
    .then(function() {
        t.assertLoadCount(1);
        t.assertModuleLoaded('pleiades/place');
    });
    
casper
    .describe("Modules > Load multiple URIs, with dupes")
    .thenOpen(baseUrl + 'test-multiple.html')
    .waitUntilLoaded()
    .then(function() {
        t.assertLoadCount(1);
        t.assertModuleLoaded('nomisma/nomisma');
        // *2 because there are two lists in index now
        t.assertEvalEquals(function() { return $('.awld p').length }, 2 * 2,
            'Two links found');
        t.assertEvalEquals(function() { return awld.moduleMap['nomisma/nomisma'].resources.length }, 2,
            'Two resources found');
        t.assertUriFound('http://nomisma.org/id/athens');
        t.assertUriFound('http://nomisma.org/id/syracuse');
    });
    
casper
    .describe("Modules > Load based on links, production build")
    .thenOpen(baseUrl + 'test-production.html')
    .waitUntilLoaded()
    .then(function() {
        t.assertLoadCount(5);
        t.assertModuleLoaded('pleiades/place');
        t.assertModuleLoaded('loc/lccn');
        t.assertModuleLoaded('perseus/smith');
        t.assertModuleLoaded('nomisma/nomisma');
        t.assertModuleLoaded('wikipedia/page');
    });

casper.run(function() {
    t.done();
});