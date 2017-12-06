var numOfEnemies = 0;
function basicEnemy(x, y, speedMult) {
	//console.log("in basicEnemy");
	//console.log(speedMult);
	this.x = x;
	this.y = y;
	this.hp = 1;
	this.speedMult = speedMult;
	this.width = 50;
	this.height = 50;
	this.points = 100;
	this.enemyID = numOfEnemies;
	numOfEnemies++;
}

function wideEnemy(x, y, speedMult) {
	this.x = x;
	this.y = y;
	this.hp = 5;
	this.speedMult = speedMult;
	this.width = 70;
	this.height = 30;
	this.points = 200;
	this.enemyID = numOfEnemies;
	numOfEnemies++;
}

function fastEnemy(x, y, speedMult) {
	this.x = x;
	this.y = y;
	this.hp = 1;
	this.speedMult = speedMult;
	this.points = 150;
	this.width = 45;
	this.height = 65;
	this.enemyID = numOfEnemies;
	numOfEnemies++;
}

function boss1(x, y, speedMult) {
	this.x = x;
	this.y = y;
	this.hp = 20;
	this.speedMult = speedMult;
	this.moveOpp = false;
	this.points = 1000;
	this.width = 75;
	this.height = 75;
	this.enemyID = numOfEnemies;
	numOfEnemies++;
}
boss1.prototype = {
	width: 75,
	height: 75,
	draw: function() {
		this.y = this.y + (0.7 * this.speedMult);
		if ((this.x + this.width) > w) {
			this.moveOpp = true;
		}
		if (this.x < 0) {
			this.moveOpp = false;
		}
		if (!this.moveOpp) {
			this.x = this.x + (5.2 * this.speedMult);
		} else {
			this.x = this.x - (5.2 * this.speedMult);
		}
		if (this.hp == 0) {
			delete enemies[this.enemyID];
			return;
		}
		if (this.y > h) {
			gameState = "GAME_OVER";
		}
		var posX = this.x;
		var posY = this.y;
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(posX, posY, this.width, this.height);
	},
	collision: function() {
		for (i = 0; i < numOfProjectiles; i++) {
			if (projectiles[i] != null) {
				if (projectiles[i].x > this.x && projectiles[i].x < (this.x + this.width) && (projectiles[i].y - projectiles[i].height) < (this.y + this.height) && projectiles[i].y > this.y) {
					players[projectiles[i].playerID].score += 10;
					this.hp--;
					if (this.hp == 0) {
						players[projectiles[i].playerID].score += this.points;
					}
					delete projectiles[i];
				}
			}
		}
	}


}

fastEnemy.prototype = {
	width: 45,
	height: 65,
	draw: function() {
		this.y = this.y + (1.5 * this.speedMult);
		if (this.hp == 0) {
			delete enemies[this.enemyID];
			return;
		}
		if (this.y > h) {
			gameState = "GAME_OVER";
		}
		var posX = this.x;
		var posY = this.y;
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(posX, posY, this.width, this.height);
	},
	collision: function() {
		for (i = 0; i < numOfProjectiles; i++) {
			if (projectiles[i] != null) {
				if (projectiles[i].x > this.x && projectiles[i].x < (this.x + this.width) && (projectiles[i].y - projectiles[i].height) < (this.y + this.height)) {
					players[projectiles[i].playerID].score += 10;
					this.hp--;
					if (this.hp == 0) {
						players[projectiles[i].playerID].score += this.points;
					}
					delete projectiles[i];
				}
			}
		}
	}


}


wideEnemy.prototype = {
	width: 70,
	height: 30,
	draw: function() {
		this.y = this.y + (0.7 * this.speedMult);
		if (this.hp == 0) {
			delete enemies[this.enemyID];
			return;
		}
		if (this.y > h) {
			gameState = "GAME_OVER";
		}
		var posX = this.x;
		var posY = this.y;
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(posX, posY, this.width, this.height);
	},
	collision: function() {
		for (i = 0; i < numOfProjectiles; i++) {
			if (projectiles[i] != null) {
				if (projectiles[i].x > this.x && projectiles[i].x < (this.x + this.width) && (projectiles[i].y - projectiles[i].height) < (this.y + this.height)) {
					players[projectiles[i].playerID].score += 10;
					this.hp--;
					if (this.hp == 0) {
						players[projectiles[i].playerID].score += this.points;
					}
					delete projectiles[i];
				}
			}
		}
	}


}
basicEnemy.prototype = {
	width: 50,
	height: 50,
	draw: function() {
	//	console.log("in basicEnemy draw");
	//	console.log(this.y);
		this.y = this.y + (1 * this.speedMult);
	//	console.log(this.speedMult);
	//	console.log(this.y);
		if (this.hp == 0) {
			delete enemies[this.enemyID];
			return;
		}
		if (this.y > h) {
			gameState = "GAME_OVER";
		}
		var posX = this.x;
		var posY = this.y;
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(posX, posY, this.width, this.height);
	},
	collision: function() {
		for (i = 0; i < numOfProjectiles; i++) {
			if (projectiles[i] != null) {
				if (projectiles[i].x > this.x && projectiles[i].x < (this.x + this.width) && (projectiles[i].y - projectiles[i].height) < (this.y + this.height)) {
					players[projectiles[i].playerID].score += 10;
					this.hp--;
					if (this.hp == 0) {
						players[projectiles[i].playerID].score += this.points;
					}
					delete projectiles[i];
				}
			}
		}
	}

}
