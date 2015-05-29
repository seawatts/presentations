import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('channel', params.channel_id);
  },
  actions: {
    sendMessage: function() {
      var messageContent = this.get('controller.messageToAdd');
      var message = this.store.createRecord('message', {
        user: 'seawatts',
        content: messageContent,
        date: moment().format()
      });

      var route = this;
      message.save().then(function() {
        route.set('controller.messageToAdd', '');
        var channel = this.modelFor('channel');
        channel.get('messages').pushObject(message);
        channel.save();
      }).catch(function() {
        route.set('controller.errorMessage', 'Could not save message');
      });
    }
  }
});
