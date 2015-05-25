import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    login: function() {
      Ember.debug('Logging in');
    }
  }
});
