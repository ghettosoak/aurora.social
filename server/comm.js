const WebSocket = require('ws');


'ws://www.host.com/path'
const ws_back = new WebSocket.Server({ port: 4567 });
const ws_front = new WebSocket.Server({ port: 5678 });

const util = require('util')


console.log('yeah!')

ws_back.on('connection', function connection(ws) {
  console.log('NEW WS BACK CONNECTION');

	ws.on('message', function(data) {
	  console.log('MESSAGE');
	  console.log(data);

	  var index = data.split(' ')[0],
	  	key = data.split(' ')[1];

	  _state[index] = key;

	  ws_front.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
	});

});



ws_back.on('close', function close() {
  console.log('disconnected');
});

var _state = {
	background: '#120a8f',
	dots: 200,
	letter: 'a'
};


ws_front.on('connection', function connection(ws) {
  console.log('NEW WS FRONT CONNECTION');

  wsF = ws;
  ws.send('background ' + _state['background']);
  ws.send('dots ' + _state['dots']);
  ws.send('letter ' + _state['letter']);
});

ws_front.on('message', function close(data) {
  console.log('MESSAGE', data);
});

ws_front.on('close', function close() {
  console.log('disconnected');
});