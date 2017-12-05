var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;

var gameState = "RUNNING";

var numOfProjectiles = 0;
var players = [];
var projectiles = [];
var player = new Player("temp");
players.push(player);

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
			if (players[i].keys.space.pressed) {
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
}

function start() {
	update();
	draw();
	requestAnimationFrame(start);
}

start();

