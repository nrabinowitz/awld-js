var t = casper.test,
    baseUrl = casper.baseUrl;

casper.start();

casper
    .describe("Scope > Limit scope with init()")
    .thenOpen(baseUrl + 'test_scope.html', function() {
        casper.evaluate(function() {
            awld.init('#limited-scope');
        })
    })
    .waitUntilLoaded()
    .then(function() {
        t.assertLoadCount(3);
        t.assertModuleLoaded('perseus/smith');
        t.assertModuleLoaded('nomisma/nomisma');
        t.assertModuleLoaded('wikipedia/page');
        
        t.assertModuleNotLoaded('pleiades/place');
        t.assertModuleNotLoaded('loc/lccn');
    });
    
casper
    .describe("Scope > Limit scope with init(config)")
    .thenOpen(baseUrl + 'test_scope.html', function() {
        casper.evaluate(function() {
            awld.init({
                scope: '#limited-scope'
            });
        })
    })
    .waitUntilLoaded()
    .then(function() {
        t.assertLoadCount(3);
        t.assertModuleLoaded('perseus/smith');
        t.assertModuleLoaded('nomisma/nomisma');
        t.assertModuleLoaded('wikipedia/page');
        
        t.assertModuleNotLoaded('pleiades/place');
        t.assertModuleNotLoaded('loc/lccn');
    });
    
casper
    .describe("Scope > Limit scope with markup class")
    .thenOpen(baseUrl + 'test_scope.html', function() {
        casper.evaluate(function() {
            awld.init();
        })
    })
    .waitUntilLoaded()
    .then(function() {
        t.assertLoadCount(2);
        t.assertModuleLoaded('pleiades/place');
        t.assertModuleLoaded('loc/lccn');
        
        t.assertModuleNotLoaded('perseus/smith');
        t.assertModuleNotLoaded('nomisma/nomisma');
        t.assertModuleNotLoaded('wikipedia/page');
        
    });

casper.run(function() {
    t.done();
});