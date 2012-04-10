var t = casper.test,
    baseUrl = casper.baseUrl;

casper.start();

casper
    .describe("Modules > Load based on links")
    .thenOpen(baseUrl + 'test.html')
    .waitUntilLoaded()
    .then(function() {
        t.assertLoadCount(5);
        t.assertModuleLoaded('pleiades/place');
        t.assertModuleLoaded('worldcat/oclc');
        t.assertModuleLoaded('perseus/smith');
        t.assertModuleLoaded('nomisma/nomisma');
        t.assertModuleLoaded('wikipedia/page');
    });
    
casper
    .describe("Modules > Load based on links, custom setup")
    .thenOpen(baseUrl + 'test-custom.html')
    .waitUntilLoaded()
    .then(function() {
        t.assertLoadCount(1);
        t.assertModuleLoaded('pleiades/place');
    });

casper.run(function() {
    t.done();
});