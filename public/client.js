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

		if(gameState == "GAME_OVER"){
			socket.emit("overS", "GAME_OVER");
		}

		if(gameState == "NEXT_LEVEL"){
			socket.emit("overS", "NEXT_LEVEL");
		}

		if(gameState == "NOT_RUNNING"){
			socket.emit("overS", "NOT_RUNNING");
		}

		if(gameState == "RUNNING"){
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
            //console.log("players after");
            //console.log(players);
            socket.emit("players", players);
            holdNames[name] = player;
        }
	}

	socket.on('newplayer', function(name, data){
		if(name != null){
			players = data;
			numOfPlayers = players.length;
			NewPlayer(name);
		}
	});

	socket.on('keyMult', function(name, key){
		if(gameState == "NOT_RUNNING"){
			for(i = 0; i < numOfPlayers; i++){
				players[i].running = 1;
			}
		}
		console.log("keyMult");
        var play = NewPlayer(name);
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
    	gameState = mode;
    });
}