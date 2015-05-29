import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  messages: [1, 2, 3],
  name: 'channel'
});
