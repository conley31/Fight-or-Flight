window.onload = function() {
	var socket = io.connect();
	socket.on('connect', function(){
		socket.emit('join', prompt('Enter a nick name'));

		keyLoop();
	});

	function handleKeys(){
		var clientKeys = [];
		if(player.keys.left.pressed){
			clientKeys.push('left');
		}
		if(player.keys.right.pressed){
			clientKeys.push('right');
		}
		if(player.keys.space.pressed){
			clientKeys.push('space');
		}
		return clientKeys.join(' ');
	}

	var tempKey;
	function keyLoop(){
		var keys = handleKeys();
		if(keys){
			console.log(keys);
			tempKey = keys;
			socket.emit('keys', keys);
		}
		else if(tempKey){
			tempKey = null;
			socket.emit('keys', '');
		}
		requestAnimationFrame(keyLoop);
	}

	var holdNames = {};

	function NewPlayer(name){
		console.log("newplayer")
		var player = new Player(name);
		players.push(player);
		holdNames[name] = player;
		return player;
	}

	socket.on('newplayer', function(name){
		var player = NewPlayer(name);
	});

	socket.on('keyMult', function(name, key){
        var play;
        if(holdNames[name]){
        	play == holdNames[name];
        }
        console.log("test");
        if (play){
            for (var k in play.keys){
                play.keys[k].down = false;
            }
            key.split(' ').forEach(function(k){
                if (play.keys[k]){
                    play.keys[k].down = true;
                }
    		});
        }
    });
}