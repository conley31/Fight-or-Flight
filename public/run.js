var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;

var gameState = "NOT_RUNNING";
var scoreState = 0;

//var numOfEnemies = 0;
var numOfProjectiles = 0;
var enemiesDefeated = 0;
var players = [];
var powerups = [];
var numOfPowerups = 0;
var projectiles = [];
var enemies = [];
var player;
var s = 0;
var speed = 1;
var firstGame = true;

function simple() {
	var e1 = new basicEnemy(0, -60);
	enemies.push(e1);
	var e2 = new basicEnemy(80, -70);
	enemies.push(e2);
	var e3 = new basicEnemy(140, -60);
	enemies.push(e3);
	var e4 = new basicEnemy(0, 5);
	enemies.push(e4);
	var e5 = new basicEnemy(90, 10);
	enemies.push(e5);
	var e6 =new basicEnemy(150, 3);
	enemies.push(e6);
	var e7 = new wideEnemy(240, -10);
	enemies.push(e7);
	var e8 = new fastEnemy(330, -10);
	enemies.push(e8);
}
function update() {
	if(players != null && player == null){
		player = players[numOfPlayers - 1];
	}
	if(player != null){
		if (gameState === "NOT_RUNNING") {
			if(players[player.playerID].running){
				gameState = "NEXT_LEVEL";
			}
		}
		else if (gameState === "RUNNING") { // maybe should be gameState.valueOf()
			scoreState = 1;
			for (i = 0; i < numOfPlayers; i++) {
				if (players[i].keys.left.pressed && !players[i].destroyed) {
					players[i].positionDecreaseX();

				}
				if (players[i].keys.right.pressed && !players[i].destroyed) {
					players[i].positionIncreaseX();
				}
				if (players[i].keys.space.pressed && players[i].shotDelay() && !players[i].destroyed) {
					players[i].shoot();
				}
			}
			/*
			var min = Math.ceil(0);
			var max = Math.floor(650000);
			var rand = Math.floor(Math.random() * (max - min)) + min;
			if (rand < 600) {
				var p1 = new rapidFire(rand, -40, 1);
				powerups.push(p1);
			}
			var min2 = Math.ceil(-650000);
			var max2 = Math.floor(0);
			var rand2 = Math.abs(Math.floor(Math.random() * (max2 - min2)) + min2);
			if (rand2 < 600) {
				var p2 = new speedUp(rand2, -40);
				powerups.push(p2);
			}
			*/
			if (s == 3 && enemiesDefeated == numOfEnemies) {
				enemiesDefeated = 0;
				numOfEnemies = 0;
				enemies = [];
				projectiles = [];
				numOfProjectiles = 0;
				s = 0;
				speed += 0.4;
			}
			if (s == 2 && enemiesDefeated == numOfEnemies) {
				enemiesDefeated = 0;
				numOfEnemies = 0;
				enemies = [];
				projectiles = [];
				numOfProjectiles = 0;
				s = 3;
				levelThree(speed);
			}
			if (s == 1 && enemiesDefeated == numOfEnemies) {
				enemiesDefeated = 0;
				numOfEnemies = 0;
				enemies = [];
				projectiles = [];
				numOfProjectiles = 0;
				s = 2;
		//		levelScreen();
				levelTwo(speed);
			}
			if(s == 0){
				levelOne(speed);
				s = 1;
			}
		}
	}
	
}
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var i;
	for(i=0;i < numOfPlayers; i++){
		if (!players[i].destroyed) {
			players[i].collision();
			players[i].draw();
		}
	}
	enemiesDefeated = 0;
	for (i = 0; i < numOfEnemies; i++) {
		if (enemies[i] != null) {
			enemies[i].collision();
		}
		if (enemies[i] != null) {
			enemies[i].draw();	
		}
		if (enemies[i] == null) {
			enemiesDefeated++;
		}
	}

	for (i = 0; i < numOfProjectiles; i++) {
		if (projectiles[i] != null) {
			projectiles[i].draw();
		}
	}
	for (i = 0; i < numOfPowerups; i++) {
		if (powerups[i] != null) {
			powerups[i].draw();
		}
		if (powerups[i] != null) {
			powerups[i].collision();
		}
		
	}
	playerScore();
}

function start() {
	update();
	if(gameState == "NOT_RUNNING"){
		if (firstGame) {
			//levelScreen();
			startScreen();
		} else {
			endScreen();
		}
	}
	else if(gameState == "NEXT_LEVEL") {
		var check = new Date();
		if(!loading){
			time = new Date();
		}
		else if( check.getTime() >= (time.getTime() + 3000)){
			gameState = "RUNNING";
			loading = 0;
		}
		levelScreen();
	}
	else if(gameState == "GAME_OVER"){
		endScreen();
		if(scoreState){
			getHighScore();
			scoreState = 0;
		}
		// clean up
		numOfPowerups = 0;
		powerups = [];
		numOfEnemies = 0;
		speed = 1;
		enemies = [];
		numOfProjectiles = 0;
		projectiles = [];
		enemiesDefeated = 0;
		s = 0;
		for (i = 0; i < numOfPlayers; i++) {
			players[i].score = 0;
			players[i].running = 0;
			players[i].hp = 1;
			players[i].delay = 175;
			players[i].speed = 10;
			players[i].destroyed = false;
		}
		firstGame = false;
		gameState = "NOT_RUNNING";
		//
	}
	else {
		draw();
	}

	requestAnimationFrame(start);
}
start();

