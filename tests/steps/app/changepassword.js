 /*global casper, hoodie */

module.exports = function(test, options) {
  casper.thenEvaluate(function(currentPassword, newPassword) {
    hoodie.account.changePassword(currentPassword, newPassword)
    .done(function() {
      window.passwordChanged = true;
    });
  }, options.currentPassword, options.newPassword);
  casper.waitFor(function() {
    return casper.evaluate(function() {
      return window.passwordChanged;
    });
  });
};
