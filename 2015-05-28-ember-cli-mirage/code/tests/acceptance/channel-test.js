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

test('it displays messages', function(assert) {
  assert.expect(1);
  server.create('channels', {
    messages: [1, 2, 3]
  });
  server.createList('messages', 3);
  visit('/channels/1');

  andThen(function() {
    let messages = find('.message');
    assert.equal(messages.length, 3, 'messages are displayed');
  });
});

test('sending a message adds it to the list', function(assert) {
  assert.expect(3);
  server.create('channels', {
    messages: []
  });
  visit('/channels/1');

  andThen(function() {
    var messages = find('.message');
    assert.equal(messages.length, 0, 'messages are displayed');

    fillIn('.message-input', 'foo');
    click('button');
    andThen(function() {
      var addedMessage = find('.message');
      var messageText = find('.message .content').text().trim();

      assert.equal(addedMessage.length, 1, 'Created a message and is now shown');
      assert.equal(messageText, 'foo');
    });
  });
});

test('if sending a message fails then show error', function(assert) {
  assert.expect(1);

  server.create('channels', {
    messages: []
  });

  server.post('messages', {error: 'failed'}, 500);

  visit('/channels/1');

  fillIn('.message-input', 'foo');
  click('button');
  andThen(function() {
    var error = find('.create-error');
    assert.equal(error.length, 1, 'Error is shown');
  });
});
