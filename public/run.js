var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;

var gameState = "RUNNING";

//var numOfEnemies = 0;
var numOfProjectiles = 0;
var players = [];
var projectiles = [];
var enemies = [];
var player = new Player("temp");
players.push(player);

simple();
function simple() {
	var e1 = new basicEnemy(0, -40);
	enemies.push(e1);
	var e2 = new basicEnemy(40, -40);
	enemies.push(e2);
	var e3 = new basicEnemy(80, -40);
	enemies.push(e3);
	var e4 = new basicEnemy(0, 0);
	enemies.push(e4);
	var e5 = new basicEnemy(40, 0);
	enemies.push(e5);
	var e6 =new basicEnemy(80, 0);
	enemies.push(e6);
}
function update() {
	if ((player.keys.left.pressed || player.keys.right.pressed) && gameState === "NOT_RUNNING") {
		gameState = "RUNNING";
	}
	else if (gameState === "RUNNING") { // maybe should be gameState.valueOf()
		for (i = 0; i < numOfPlayers; i++) {
			if (players[i].keys.left.pressed) {
				players[i].positionDecreaseX();
				console.log("decrease");

			}
			if (players[i].keys.right.pressed) {
				players[i].positionIncreaseX();
			}
			if (players[i].keys.space.pressed && players[i].shotDelay()) {
				players[i].shoot();
			}
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
		projectiles[i].draw();
	}
	for (i = 0; i < numOfEnemies; i++) {
		enemies[i].draw();
	}
}

function start() {
	update();
	draw();
	requestAnimationFrame(start);
}

start();

