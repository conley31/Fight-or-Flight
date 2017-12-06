var highSCanvas = document.getElementById('score');
var highscore = highSCanvas.getContext('2d');
var wH = highSCanvas.width;
var hH = highSCanvas.height;
var startLoc = 24;
var scoreList = [];
var newScores = 0;

function updateHighScore(){
	startLoc = 24;
	highscore.clearRect(0, 0, wH, hH);
	
	highscore.font = '24px Arial';
		highscore.fillStyle = '#000';
		highscore.textAlign = 'center';
		highscore.fillText("Highscores", wH / 2, startLoc);

	for(i = 1; i < 16; i++){
		startLoc += 30;
		var leader;
		if(scoreList[i-1] != null){
			if(scoreList[i-1][0] != null){
				leader = i + "." + "  " + scoreList[i-1][0].name + "   " + scoreList[i-1][0].score;
			}
			else {
				leader = i + ".";			
			}
		}
		else {
			leader = i + ".";			
		}
		highscore.font = '16px Arial';
		highscore.fillStyle = '#000';
		highscore.textAlign = 'left';
		highscore.fillText(leader, 0 + 5, startLoc);
	}

}

function getHighScore(){
	console.log("getting high Score");
	var sample = [{
		name: "",
		score: ""
	}]

	for(i = 0; i < numOfPlayers; i++){
		for(j = 14; j >= 0; j--){

			if(scoreList[j][0] != null){
				console.log(scoreList[j][0]);
				console.log(players[i].score);
				if(players[i].score <= parseInt(scoreList[j][0].score)){
					console.log(j)
					sample[0].name = players[i].username;
					sample[0].score = String(players[i].score);
					scoreList.splice(j-1, 0, sample);
					break;
				}
				else if(players[i].score > parseInt(scoreList[j][0].score) && j == 0){
					sample[0].name = players[i].username;
					sample[0].score = String(players[i].score);
					scoreList.splice(0, 0, sample);
					break;
				}
			}
		}
	}

	newScores = 1;
	updateHighScore();
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