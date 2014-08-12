/*global casper:false */
var hosts = require('../../hosts.json');

casper.test.begin('add tasks, reload, sign up, sign in, sync', function(test) {
  var username = 'synctest';
  var url1 = hosts.www;
  var url2 = hosts.www.replace('127.0.0.1', 'localhost');

  casper.start(url1);

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

  casper.thenOpen(url2);

  require('../../steps/app/signin')(test, {
    username: username,
    password: 'hoodiepass'
  });

  casper.waitForSelectorTextChange('.hoodie-username');
  casper.waitForText('first task');
  casper.then(function() {
    test.assertTextExists('first task');
    test.assertTextExists('2nd task');
  });

  // IMPORTANT! Always cleanup, on each visited host.
  require('../../steps/app/destroyaccount')(test, {
    url: url1
  });
  require('../../steps/app/destroyaccount')(test, {
    url: url2
  });
});
