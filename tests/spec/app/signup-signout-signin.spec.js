/*global casper:false */
var hosts = require('../../hosts.json');

casper.test.begin('Sign up -> sign out -> sign in', function(test) {
  var username = 'hoodieusersignincheck';
  casper.start(hosts.www);

  // sanitiy check
  casper.then(function() {
    test.assertEvalEqual(function() {
      return $('html').data('hoodie-account-status');
    }, 'signedout');
  });

  require('../../steps/app/signup')(test, {
    username: username,
    password: 'hoodiepass'
  });

  casper.waitFor(function() {
    return casper.evaluate(function() {
      console.log($('html').data('hoodie-account-status'));
      return $('html').data('hoodie-account-status') === 'signedin';
    });
  });

  casper.then(function() {
    casper.capture('debug/data-before-signup.png');
  });

  casper.wait(1000);
  casper.then(function() {
    casper.capture('debug/data-before-signout.png');
  });

  require('../../steps/app/signout')(test);
  casper.waitForSelectorTextChange('.hoodie-username');



  casper.waitFor(function() {
    return casper.evaluate(function() {
      return $('html').data('hoodie-account-status') === 'signedout';
    });
  });

  casper.then(function() {
    casper.capture('debug/data-after-signout.png');
  });

  require('../../steps/app/signin')(test, {
    username: username,
    password: 'hoodiepass'
  });

  casper.waitFor(function() {
    return casper.evaluate(function() {
      return $('html').data('hoodie-account-status') === 'signedin';
    });
  });

  // IMPORTANT! Always cleanup, on each visited host.
  require('../../steps/app/destroyaccount')(test, {
    url: hosts.www
  });
});
