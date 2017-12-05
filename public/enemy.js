var numOfEnemies = 0;
function basicEnemy(x, y) {
	this.x = x;
	this.y = y;
	this.hp = 1;
	this.width = 50;
	this.height = 50;
	this.enemyID = numOfEnemies;
	numOfEnemies++;
}

basicEnemy.prototype = {
	width: 50,
	height: 50,
	draw: function() {
		this.y = this.y + 1;
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
				if (projectiles[i].x > this.x && projectiles[i].x < (this.x + this.width) && projectiles[i].y < this.y && projectiles[i].y > (this.y - this.height)) {
					delete projectiles[i];
					this.hp--;
				}
			}
		}
	}

}
