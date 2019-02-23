// Vendor files
var $ = window.jQuery = window.$ = require('./vendor/jquery-1.11.1.min');

var $$_ = window.$$_ = require('./shared/core'); 

$(function($){

	var ws,
		webSocketCloseCount = 0,

	setupWebSocket = function() {
		if (webSocketCloseCount >= 100){
			console.log('something is fishy with the websockets.');
			return false;
		}

		if (!!ws){
	    ws.close();
		}

		if (window.location.origin.indexOf('pro.ject.ch') >= 0){
			ws = new WebSocket("ws://pro.ject.ch/aurora_front");
		}else{	
			ws = new WebSocket("ws://192.168.1.146:5678");
		}

		ws.onopen = function(evt) {
			console.log('OPENED')
			webSocketCloseCount = 0;
			console.log(evt.data)
		}
		ws.onmessage = function (evt) { 
			var _data = evt.data;
			console.log(evt.data, 'yeah!!');
			change(evt.data);

			var index = _data.split(' ')[0],
				key = _data.split(' ')[1];

				console.log(index, key)

			if (index === 'background') {
				$('.background').css('background-color', key)
			} else if (index === 'dots') {
				$('.dots').attr('data-size', key)
			} else if (index === 'letter') {
				$('.letters span').addClass('outgoing');
				$('.letters').append('<span class="incoming">' + key + '</span>');
				setTimeout(function() {
					$('.letters span').removeClass('incoming');
				}, 50);
				setTimeout(function() {
					$('.letters .outgoing').remove();
				}, 1000)
			}
		};
		ws.onclose = function() { 
			console.log('websocket is closed, opening next');
			webSocketCloseCount++;
		};
	}

	setupWebSocket();
});



































