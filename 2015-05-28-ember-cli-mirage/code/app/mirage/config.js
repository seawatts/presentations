export default function() {
  //this.get('users', {error: 'unauth'}, 401);
  this.get('users');
  this.post('users');

  this.get('contents');
  this.post('contents');
}
