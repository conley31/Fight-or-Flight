var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;

Player player = new Player("test0");
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player.draw();
	requestAnimationFrame(draw);
}

function start() {
	draw();

}

start();
