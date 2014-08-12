/*global casper:false */
var hosts = require('../../hosts.json');

casper.test.begin('Sign up -> change password -> sign out -> sign in with new password', function(test) {
  var username = 'changeusernamecheck';
  var password = 'hoodiepass';
  var password2 = 'hoodiepass2';
  casper.start(hosts.www);


  require('../../steps/app/signup')(test, {
    username: username,
    password: password
  });
  casper.waitForSelectorTextChange('.hoodie-username');
  casper.then(function() {
    test.assertSelectorHasText('.hoodie-username', username);
  });

  require('../../steps/app/changepassword')(test, {
    currentPassword: password,
    newPassword: password2,
  });

  require('../../steps/app/signout')(test);
  casper.waitForSelectorTextChange('.hoodie-username');
  casper.then(function() {
    test.assertSelectorDoesntHaveText('.hoodie-username', username);
  });

  require('../../steps/app/signin')(test, {
    username: username,
    password: password
  });

  casper.waitForSelectorTextChange('.hoodie-username');
  casper.then(function() {
    test.assertSelectorHasText('.hoodie-username', username);
  });

  // IMPORTANT! Always cleanup, on each visited host.
  require('../../steps/app/destroyaccount')(test, {
    url: hosts.www
  });
});
