 /*global casper, hoodie */

module.exports = function(test, options) {

  console.log('destroying data at ' + options.url)

  casper.thenOpen(options.url);
  casper.thenEvaluate(function() {
    hoodie.account.destroy(true)
    .then(function() {
      localStorage.clear();
    });
  });

  var count = 0;
  var checkIntreval;
  var check = function() {
    var hasNoAccount = casper.evaluate(function() {
      return hoodie.account.hasAccount() === false;
    });
    if (hasNoAccount) {
      clearInterval(checkIntreval);
      return true;
    }

    count += 1;

    if (count > 50) {
      casper.echo('TIMEOUT: Could not sign out after running tests.');
      return true;
    }
  };

  casper.waitFor(check);
};
