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
	var e2 = new basicEnemy(60, -60);
	enemies.push(e2);
	var e3 = new basicEnemy(120, -60);
	enemies.push(e3);
	var e4 = new basicEnemy(0, 0);
	enemies.push(e4);
	var e5 = new basicEnemy(60, 0);
	enemies.push(e5);
	var e6 =new basicEnemy(120, 0);
	enemies.push(e6);
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
				if (players[i].keys.left.pressed) {
					players[i].positionDecreaseX();

				}
				if (players[i].keys.right.pressed) {
					players[i].positionIncreaseX();
				}
				if (players[i].keys.space.pressed && players[i].shotDelay()) {
					players[i].shoot();
				}
			}

			if(s == 0){
				simple();
				s = 1;
			}
		}
		else if (gameState === "GAME_OVER") {
			ctx.font = "30px Arial";
			ctx.fillStyle = "#000";
			ctx.textAlign = "center"
			ctx.fillText("GAME OVER", w / 2, h / 2);
		}
	}
	
}
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var i;
	for(i=0;i < numOfPlayers; i++){
		players[i].draw();
	}
	for (i = 0; i < numOfProjectiles; i++) {
		if (projectiles[i] != null) {
			projectiles[i].draw();
		}
	}
	for (i = 0; i < numOfEnemies; i++) {
		if (enemies[i] != null) {
			enemies[i].collision();
			enemies[i].draw();
		}
	}
}

function start() {
	update();
	draw();
	requestAnimationFrame(start);
}

start();

