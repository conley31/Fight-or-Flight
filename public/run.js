var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
var testW = w / 2;
var testH = h - 30;

function drawBall() {
	ctx.beginPath();
	ctx.arc(testW, testH, 10, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	testW += 2;
	testH -= 2;
}

function start() {
	draw();
}

start();
