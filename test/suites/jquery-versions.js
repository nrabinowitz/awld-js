var t = casper.test,
    baseUrl = casper.baseUrl;

casper.start();

function setRequireJquery() {
    require(['jquery'], function($) {
        awld.requirejQuery = $.fn.jquery;
    });
}
function getRequireJquery() {
    return this.evaluate(function() {
        return awld.requirejQuery;
    });
}

casper
    .describe("jQuery versions > no jQuery loaded")
    .thenOpen(baseUrl + 'test.html')
    .thenEvaluate(setRequireJquery)
    .waitFor(getRequireJquery, function() {
        t.assertEvalEquals(function() { return awld.requirejQuery }, '1.7.2',
            'Require using local version of jQuery');
    }, function() {
        this.fail('Could not get value of require jQuery');
    });

casper
    .describe("jQuery versions > valid jQuery loaded")
    .thenOpen(baseUrl + 'test-jquery-1.7.1.html')
    .waitFor(function() {
        return this.evaluate(function() { return !!window.jQuery })
    })
    .then(function() {
        t.assertEvalEquals(function() { return window.jQuery.fn.jquery }, '1.7.1',
            'Existing jQuery not clobbered');
            
    })
    .thenEvaluate(setRequireJquery)
    .waitFor(getRequireJquery, function() {
        t.assertEvalEquals(function() { return awld.requirejQuery }, '1.7.1',
            'Require using existing version of jQuery');
    }, function() {
        this.fail('Could not get value of require jQuery');
    });

casper
    .describe("jQuery versions > too-old jQuery loaded")
    .thenOpen(baseUrl + 'test-jquery-1.3.1.html')
    .waitFor(function() {
        return this.evaluate(function() { return !!window.jQuery })
    })
    .then(function() {
        t.assertEvalEquals(function() { return window.jQuery.fn.jquery }, '1.3.1',
            'Existing jQuery not clobbered');
    })
    .thenEvaluate(setRequireJquery)
    .waitFor(getRequireJquery, function() {
        t.assertEvalEquals(function() { return awld.requirejQuery }, '1.7.2',
            'Require using local version of jQuery');
    }, function() {
        this.fail('Could not get value of require jQuery');
    });

casper.run(function() {
    t.done();
});