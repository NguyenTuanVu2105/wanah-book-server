var Pusher = require('pusher');

var channels_client = new Pusher({
  appId: '878339',
  key: 'f582283ec0d6565ecd85',
  secret: '313de48c71b5a433d370',
  cluster: 'ap1',
  encrypted: true
});


channels_client.trigger('my-channel', 'my-event', {
  "message": "hello world"
});