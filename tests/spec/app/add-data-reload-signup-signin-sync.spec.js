/*global casper:false */
var hosts = require('../../hosts.json');

casper.test.begin('add tasks, reload, sign up, sign in, sync', function(test) {
  var username = 'synctest';

  casper.start(hosts.www);
  require('../../steps/app/addtask')(test, [
    'first task',
    '2nd task'
  ]);

  casper.thenOpen(hosts.www + '?2');
  casper.then(function() {
    test.assertTextExists('first task');
    test.assertTextExists('2nd task');
  });

  require('../../steps/app/signup')(test, {
    username: username,
    password: 'hoodiepass'
  });
  casper.waitForSelectorTextChange('.hoodie-username');

  casper.thenOpen(hosts.www.replace('127.0.0.1', 'localhost'));

  require('../../steps/app/signin')(test, {
    username: username,
    password: 'hoodiepass'
  });
  casper.waitForSelectorTextChange('.hoodie-username');

  casper.then(function() {
    casper.evaluate(function() {
      console.log('location.href');
      console.log(location.href);
    });
    casper.capture('debug/data.png');
  });
  casper.waitForText('first task');
  casper.then(function() {
    test.assertTextExists('first task');
    test.assertTextExists('2nd task');
  });
});
