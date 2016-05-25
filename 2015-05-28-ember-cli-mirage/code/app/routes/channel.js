import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('channel', params.channel_id);
  },
  actions: {
    sendMessage: function() {
      var messageToAdd = this.get('controller.messageToAdd');
      var message = this.store.createRecord('message', {
        content: messageToAdd,
        user: 'seawatts',
        date: moment().format()
      });

      message.save();

      var channel = this.modelFor('channel');

      channel.get('messages').pushObject(message);
      channel.save();
    }
  }
});
