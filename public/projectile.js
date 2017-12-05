function Projectile(x, y, playerID) {
	this.x = x;
	this.y = y;
	this.width = 2;
	this.height = 4;
	this.playerID = playerID;
}

Projectile.prototype = {
	width: 2,
	height: 4,
	draw: function() {
		var posX = this.x;
		var posY = this.y;
		posX++;
		posY++;
		ctx.fillStyle = colors[this.playerID];
		ctx.fillRect(posX, posY, this.width, this.height);	
	}
}
