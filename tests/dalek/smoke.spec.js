var hosts = require('../hosts.json');

module.exports = {

  'returns app': function(test) {
    test
      .open(hosts.www)
      .assert.text('.jumbotron p', 'hoodie playground.', 'shows my first hoodie app')
      .done();
  },

  'returns app/_api': function(test) {
    test
      .open(hosts.www + '_api')
      .assert.text('body').to.contain('Welcome', 'returns CouchDB Welcome JSON')
      .done();
  },

  'returns admin dashboard': function(test) {
    test
      .open(hosts.admin)
      .assert.title().is('Admin Dashboard', 'shows Admin Dashboard')
      .done();
  },

  'returns admin dashboard/_api': function(test) {
    test
      .open(hosts.www + '_api')
      .assert.text('body').to.contain('Welcome', 'returns CouchDB Welcome JSON')
      .done();
  }
};
