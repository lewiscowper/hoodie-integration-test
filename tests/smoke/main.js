/*global casper:false */

'use strict';

var MAIN_URL= 'http://127.0.0.1:6001/';
// var MAIN_URL= 'http://localhost:6081/';

casper.test.comment('check hosts');
casper.on('remote.message', function(message){
  console.log(message);
});

casper.start(MAIN_URL, function(resp) {
  this.test.info('Current location is ' + this.getCurrentUrl());

  this.test.assert(resp.status === 200);
  this.test.assert(this.getCurrentUrl() === MAIN_URL);
});

casper.waitFor(hoodieIsLoaded);

// create some todos
casper.then(function() {
  casper.echo(this.evaluate(function() {
    return 'hoodie: ' + (typeof window.hoodie);
  }));

  casper.evaluate(function() {
    window.hoodie.store.add('todo', {title: 'todo 1'});
    window.hoodie.store.add('todo', {title: 'todo 2'});
    window.hoodie.store.add('todo', {title: 'todo 3'});
  });

  casper.waitFor(function() {
    return this.evaluate(function() {
      return window.$('#todolist li').length === 3;
    });
  });
});

casper.then(function() {
  casper.capture('debug.png');
});

casper.run(function() {
  this.test.done();
});

// helpers
function hoodieIsLoaded() {
  return this.evaluate(function() {
    return !! window.hoodie;
  });
}
