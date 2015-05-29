import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  messages: DS.hasMany('message', {async: true})
//  users: DS.hasMany('user')
});
