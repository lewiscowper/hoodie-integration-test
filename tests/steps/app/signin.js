/*global casper:false */

module.exports = function(test, options) {
  casper.waitForSelector({
    type: 'xpath',
    path: '//a[normalize-space(text())=\'Sign In\']'
  },
  function success() {
    test.assertExists({
      type: 'xpath',
      path: '//a[normalize-space(text())=\'Sign In\']'
    });
    this.click({
      type: 'xpath',
      path: '//a[normalize-space(text())=\'Sign In\']'
    });
  },
  function fail() {
    test.assertExists({
      type: 'xpath',
      path: '//a[normalize-space(text())=\'Sign In\']'
    });
  });
  casper.waitForSelector('.modal.in',
  function success() {
    this.sendKeys('input[name=\'username\']', options.username);
    this.sendKeys('input[name=\'password\']', options.password);
    this.click('form .modal-footer .btn.btn-primary');
  },
  function fail() {
    test.assertExists('input[name=\'username\']');
  });

};
