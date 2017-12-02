var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;

var gameState = "NOT_RUNNING";

var players = [];
function update() {
	if (gameState == "RUNNING") { // maybe should be gameState.valueOf()
		for (i = 0; i < numOfPlayers; i++) {
			if (players[i].keys.left.pressed) {
				players[i].positionX(-2);
			}
			if (players[i].keys.right.pressed) {
				players[i].positionX(2);
			}
		}
	}
}
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player.draw();
	requestAnimationFrame(draw);
}

function start() {
	draw();

}

start();
