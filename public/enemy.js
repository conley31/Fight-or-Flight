var numOfEnemies = 0;
function basicEnemy(x, y) {
	this.x = x;
	this.y = y;
	this.hp = 1;
	this.width = 30;
	this.height = 30;
	this.enemyID = numOfEnemies;
	numOfEnemies++;
}

basicEnemy.prototype = {
	width: 30,
	height: 30,
	draw: function() {
		this.y = this.y - 2;
		var posX = this.x;
		var posY = this.y;
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(posX, posY, this.width, this.height);
	}

}
