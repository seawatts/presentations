import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.attr('string'),
  content: DS.attr('string'),
  date: DS.attr('string')
});
