var hosts = require('../hosts.json');

var username = 'dalekuser';
var password = 'dalekpass';

module.exports = {

  'open app, sign up, sign out, sign in': function(test) {
    test
      .open(hosts.www)
      .assert.visible('[data-hoodie-action=signup]')
      .click('[data-hoodie-action=signup]')
      .assert.visible('[name=password_confirmation]')
      .type('[name=username]', username)
      .type('[name=password]', password)
      .type('[name=password_confirmation]', password)
      .submit('.modal form')
      .assert.visible('.hoodie-username')
      .assert.text('.hoodie-username').to.contain('dalekuser')
      .click('[data-hoodie-action=signout]')
      .assert.visible('[data-hoodie-action=signup]')
      .click('.hoodie-account-signedout [data-toggle=dropdown]')
      .click('[data-hoodie-action=signin]')
      .assert.visible('[name=username]')
      .type('[name=username]', username)
      .type('[name=password]', password)
      .submit('.modal form')
      .assert.visible('.hoodie-username')
      .assert.text('.hoodie-username').to.contain('dalekuser');
  },
};
