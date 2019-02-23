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
			ws = new WebSocket("ws://pro.ject.ch/aurora_back");
		}else{	
			ws = new WebSocket("ws://localhost:4567");
		}

		ws.onopen = function() {
			console.log('OPENED')
			webSocketCloseCount = 0;
		}
		ws.onmessage = function (evt) { 
			var received_msg = evt.data;
			console.log(evt.data, 'yeah!!');
			change(evt.data);
		};
		ws.onclose = function() { 
			console.log('websocket is closed, opening next');
			webSocketCloseCount++;
		};

	};

	$('.background .color').each(function() {
		var $that = $(this);

		$that.css('background-color', $that.attr('data-color'));

	});
	
	$('.background .color').on('click', function() {
		var $that = $(this);
		ws.send('background ' + $that.attr('data-color') );
	});

	$('.dot').on('click', function() {
		var $that = $(this);

		ws.send('dots ' + $that.attr('data-size') );

		$that.addClass('selected')
			.siblings().removeClass('selected');
	});

	$('.letters_input').on('keyup', function(e) {
		var $that = $(this);

		if (e.keyCode === 13) {
			ws.send('letter ' + $that.val()[0] );

			setTimeout(function() {
				$that.val('');
			}, 1000);
		}		
	})


	setupWebSocket();

});

