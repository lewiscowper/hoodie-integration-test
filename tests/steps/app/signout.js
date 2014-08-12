/*global casper:false */

module.exports = function(test) {
  casper.waitForSelector('[data-hoodie-action=signout]',
  function success() {
    test.assertExists('[data-hoodie-action=signout]');
    this.click('[data-hoodie-action=signout]');
  },
  function fail() {
    test.assertExists('[data-hoodie-action=signout]');
  });
};
