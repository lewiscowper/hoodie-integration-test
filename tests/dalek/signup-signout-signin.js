var hosts = require('../hosts.json');

var username = 'dalekuser';
var password = 'dalekpass';

module.exports = {

  'open app, sign up, sign out, sign in': function(test) {
    test
      .open(hosts.www)
      .assert.visible('[data-hoodie-action=signup]', 'Sign up button visible')
      .click('[data-hoodie-action=signup]')
      .assert.visible('.modal form', 'Sign up form visible')
      .type('[name=username]', username)
      .type('[name=password]', password)
      .type('[name=password_confirmation]', password)
      .submit('.modal form')
      .waitFor(function() {
        return !!hoodie.account.username
      })
      .assert.visible('.hoodie-account-signedin', 'Sign out button visible')
      .assert.text('.hoodie-account-signedin .hoodie-username').to.contain('dalekuser')
      .click('[data-hoodie-action=signout]')
      .click('.hoodie-account-signedout [data-toggle=dropdown]')
      .click('[data-hoodie-action=signin]')
      .assert.visible('.modal form', 'Sign in form visible')
      .type('[name=username]', username)
      .type('[name=password]', password)
      .submit('.modal form')
      .waitFor(function() {
        return !hoodie.account.username
      })
      .assert.visible('.hoodie-account-signedin .hoodie-username')
      .assert.text('.hoodie-account-signedin .hoodie-username').to.contain('dalekuser');
  },
};
