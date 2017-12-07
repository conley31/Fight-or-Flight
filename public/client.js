var waitingCount = 0;
window.onload = function() {
	var socket = io.connect();
	socket.on('connect', function(){
		scoreList = [];
		socket.emit('join', prompt('Enter a nick name under 10 characters'));

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

		if(player.keys.up.pressed){
			clientKeys.push('up');
		}
		return clientKeys.join(' ');
	}

	var tempKey;
	var waited = 0;
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

		if(gameState == "GAME_OVER"){
			waited = 0;
			waitingCount = 0;

			socket.emit("overS", "GAME_OVER");
		}

		if(gameState == "NEXT_LEVEL" && !firstlevel && !waited){
			waited = 1;
			socket.emit("overS", "NEXT_LEVEL");
		}

		if(gameState == "NOT_RUNNING"){
			waitingCount = 0;
			waited = 0;
			socket.emit("overS", "NOT_RUNNING");
		}

		if(gameState == "RUNNING"){
			waitingCount = 0;
			waited = 0;
			socket.emit("overS", "RUNNING");
		}

		if(newScores){
			console.log("UPDATE DATABASE");
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
        	//console.log("players before");
        	//console.log(players);
            var player = new Player(name);
            console.log(player);
        	if(gameState == "RUNNING"){
        		player.destroyed = true;
        	}
            players.push(player);
            //socket.emit("players", players);
            holdNames[name] = player;
        }
	}

	socket.on('newplayer', function(name, data){
		if(name != null){
			/*for(i = 0; i < data.length; i++){
				data[i] = new Player(data[i].username);
			}
			players = data;
			numOfPlayers = players.length;*/
			NewPlayer(name);
		}
	});

	socket.on('keyMult', function(name, key){
		if(gameState == "NOT_RUNNING"){
			for(i = 0; i < numOfPlayers; i++){
				if(key == 'up'){
					players[i].running = 1;
				}
			}
		}
		console.log("keyMult");
        var play = NewPlayer(name);
        if(play == null){
        	return;
        }
        if(play != player){
        	if(key.includes('left')){
        		play.positionDecreaseX()
        	}
        	if(key.includes('right')){
        		play.positionIncreaseX();
        	}
        	if(key.includes('space') && play.shotDelay()){
        		play.shoot();
        	}
        	if(key.includes('up')){
        		play.keys.up.pressed = true;
        	}
        }
    });

    socket.on("returnscore", function(results){
    	scoreList.push(results);
    	updateHighScore();
    });

    socket.on("overC", function(state){
    	gameState = state;
    });

    socket.on("state", function(mode){
    	if(player != null){
    		player.destroyed = true;
    	}
    	//gameState = mode;
    });

    socket.on('waiting', function(){
    	waitingCount++;
    });
}