import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  content: 'Foo',
  user: 'test-user',
  date: moment()
});
