import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'code/tests/helpers/start-app';

var application;

module('Acceptance | channel', {
  beforeEach: function() {
    application = startApp();
    server.logging = true;
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('when send a message it gets displayed on the page', function(assert) {
  assert.expect(1);

  server.get('/channels');
  server.create('channels', {
    messages: []
  });

  visit('/channels/1');

  andThen(function() {
    fillIn('.message-input', 'foo');

    click('button');

    andThen(function() {
      var messages = find('.message');

      assert.equal(messages.length, 1);

    });
  });

});

test('shows error when failed to send message', function(assert) {
  server.post('/message', {error: 'failed to send'}, 500);
});
