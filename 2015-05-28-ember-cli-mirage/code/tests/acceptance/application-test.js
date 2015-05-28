import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'code/tests/helpers/start-app';

var application;

module('Acceptance | application', {
  beforeEach: function() {
    application = startApp();
    server.logging = true;
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /content without being logged in redirects you to the login page', function(assert) {
  server.create('contents');
  visit('/content');

  andThen(function() {
    var contents = find('.content');
    assert.equal(contents.length, 1, 'One content was shown');
  });
});

test('creating a new piece of content adds one to the list', function(assert) {
  assert.expect(3);
  visit('/content');

  andThen(function() {
    let content = find('.content');
    assert.equal(content.length, 0, 'no content is being displayed');

    fillIn('.content-input', 'foo');
    click('.create-content');
    andThen(function() {
      let content = find('.content');

      assert.equal(content.length, 1, 'Created a content and is now shown');
      assert.equal(content.text().trim(), 'foo');
    });
  });
});

test('if creating new content fails show error', function(assert) {
  assert.expect(1);

  server.post('contents', {error: 'failed'}, 500);
  visit('/content');

  fillIn('.content-input', 'foo');
  click('.create-content');
  andThen(function() {
    var error = find('.create-error');
    assert.equal(error.length, 1, 'Error is shown');
  });
});
