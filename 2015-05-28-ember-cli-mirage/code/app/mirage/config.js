export default function() {
  this.namespace = 'api';
  this.get('/channels');

  this.get('/messages/:id');
  this.post('/messages');

  this.get('/channels/:id');
  this.put('/channels/:id', function() {
    return {};
  });
}
