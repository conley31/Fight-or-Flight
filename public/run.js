var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;

var gameState = "RUNNING";

var players = [];
var player = new Player('test0');
players.push(player);

function update() {
	if ((player.keys.left.pressed || player.keys.right.pressed) && gameState == "NOT_RUNNING") {
		gameState = "RUNNING";
	}
	if (gameState == "RUNNING") { // maybe should be gameState.valueOf()
		for (i = 0; i < numOfPlayers; i++) {
			if (players[i].keys.left.pressed) {
				players[i].positionDecreaseX();
				console.log("decrease");

			}
			if (players[i].keys.right.pressed) {
				players[i].positionIncreaseX();
			}
		}
	}
}
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player.draw();
}

function start() {
	update();
	draw();
	//requestAnimationFrame(start);
}

start();

console.log(player.keys);
