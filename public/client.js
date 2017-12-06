window.onload = function() {
	var socket = io.connect();
	socket.on('connect', function(){
		scoreList = [];
		socket.emit('join', prompt('Enter a nick name'));
		socket.emit('HIGHSCORE');

		keyLoop();
	});

	function handleKeys(){
		var clientKeys = [];
		if(player == null){
			return;
		}
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
			tempKey = keys;
			socket.emit('keys', keys);
		}
		else if(tempKey){
			tempKey = null;
			socket.emit('keys', '');
		}

		if(gameState == "GAME_OVER" && newScores){
			socket.emit('putScore', scoreList);
			newScores = 0;
		}
		requestAnimationFrame(keyLoop);
	}

	var holdNames = {};

	function NewPlayer(name){
		if (holdNames[name]){
            return holdNames[name];
        } else {
            var player = new Player(name);
            players.push(player);
            holdNames[name] = player;
        }
	}

	socket.on('newplayer', function(name){
		NewPlayer(name);
	});

	socket.on('keyMult', function(name, key){
		if(gameState == "NOT_RUNNING"){
			for(i = 0; i < numOfPlayers; i++){
				players[i].running = 1;
			}
		}
        var play = NewPlayer(name);
        if(play != player){
        	if(key == 'left'){
        		play.positionDecreaseX()
        	}
        	if(key == 'right'){
        		play.positionIncreaseX();
        	}
        	if(key == 'space' && play.shotDelay()){
        		play.shoot();
        	}
        }
    });

    socket.on("returnscore", function(results){
    	scoreList.push(results);
    	updateHighScore();
    });
}