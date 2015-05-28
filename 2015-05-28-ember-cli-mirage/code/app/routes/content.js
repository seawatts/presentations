import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('content');
  },
  actions: {
    createContent: function() {
      this.set('controller.createError', '');
      var contentName = this.get('controller.contentToAdd');

      var contentRecord = this.store.createRecord('content', {
        name: contentName
      });

      var _this = this;
      contentRecord.save().then(function() {
        _this.set('controller.contentToAdd', '');
      }).catch(function(err) {
        Ember.debug(err);
        _this.set('controller.createError', 'Could not create record');
      });
    }
  }
});
