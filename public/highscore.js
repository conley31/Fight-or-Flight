var highSCanvas = document.getElementById('score');
var highscore = highSCanvas.getContext('2d');
var wH = highSCanvas.width;
var hH = highSCanvas.height;
var startLoc = 24;

function updateHighScore(){
	console.log("score");
	highscore.font = '24px Arial';
		highscore.fillStyle = '#000';
		highscore.textAlign = 'center';
		highscore.fillText("Highscores", wH / 2, startLoc);

	for(i = 1; i < 16; i++){
		startLoc += 30;
		var leader = i + ".";
		highscore.font = '16px Arial';
		highscore.fillStyle = '#000';
		highscore.textAlign = 'right';
		highscore.fillText(leader, wH / 2, startLoc);
	}

}

function getHighSchore(){

}

function startScreen(){
	var can = document.getElementById('game-canvas');
	var ct = can.getContext('2d');
	var wS = can.width;
	var hS = can.height;
	ct.font = '40px Arial';
	ct.fillStyle = '#000';
	ct.textAlign = 'center';
	ct.fillText("START GAME", wS / 2, hS / 2);
}

function endScreen(){
	var can = document.getElementById('game-canvas');
	var ct = can.getContext('2d');
	var wS = can.width;
	var hS = can.height;
	ct.font = '40px Arial';
	ct.fillStyle = '#ff0000';
	ct.textAlign = 'center';
	ct.fillText("GAME OVER", wS / 2, hS / 2);
}

updateHighScore();