var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;

var gameState = "NOT_RUNNING";

//var numOfEnemies = 0;
var numOfProjectiles = 0;
var players = [];
var projectiles = [];
var enemies = [];
var player;
var s = 0;

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
				gameState = "RUNNING";
			}
		}
		else if (gameState === "RUNNING") { // maybe should be gameState.valueOf()
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

			if(s == 0){
				levelOne();
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
	for (i = 0; i < numOfEnemies; i++) {
		if (enemies[i] != null) {
			enemies[i].collision();
			enemies[i].draw();
		}
	}

	for (i = 0; i < numOfProjectiles; i++) {
		if (projectiles[i] != null) {
			projectiles[i].draw();
		}
	}
	
}

function start() {
	update();
	if(gameState == "NOT_RUNNING"){
		startScreen();
	}
	else if(gameState == "GAME_OVER"){
		endScreen();
	}
	else {
		draw();
	}

	requestAnimationFrame(start);
}
start();

