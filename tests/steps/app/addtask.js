 /*global casper:false */

module.exports = function(test, tasks) {
  casper.waitForSelector('input#todoinput',
    function success() {
      test.assertExists('input#todoinput');
      this.click('input#todoinput');
    },
    function fail() {
      test.assertExists('input#todoinput');
    }
  );
  casper.waitForSelector('input#todoinput',
    function success() {
      if (typeof tasks !== 'string') {
        tasks = tasks.join('\r')
      }
      this.sendKeys('input#todoinput', tasks + '\r');
    },
    function fail() {
      test.assertExists('input#todoinput');
    }
   );
};
