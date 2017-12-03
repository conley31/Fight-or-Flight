window.onload = function() {
	var socket = io.connect();
	socket.on('connect', function(){
		socket.emit('join', prompt('Enter a nick name'));

		start();
	});

	function handleKeys(){
		var clientKeys = [];
		if(keys.left.down){
			clientKeys.push('left');
		}
		if(keys.right.down){
			clientKeys.push('right');
		}
		if(keys.space.down){
			clientKeys.push('space');
		}
		return clientKeys.join(' ');
	}

	var tempKey;
	function start(){
		var keys = handleKeys();
		if(keys){
			tempKey = keys;
			socket.emit('keys', keys);
		}
		else if(tempKey){
			tempKey = null;
			socket.emit('keys', '');
		}
	}
}