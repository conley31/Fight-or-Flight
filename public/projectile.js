function Projectile(x, y, playerID) {
	this.x = x;
	this.y = y;
	this.width = 4;
	this.height = 10;
	this.projID = numOfProjectiles;
	numOfProjectiles++;
	this.playerID = playerID;
}

Projectile.prototype = {
	width: 4,
	height: 10,
	draw: function() {
		this.y = this.y - 8;
		if (this.y < 0) {
			numOfProjectiles--;
			projectiles.shift();
		}
		var posX = this.x;
		var posY = this.y;
		ctx.fillStyle = '#FFA500';
		ctx.fillRect(posX, posY, this.width, this.height);	
	}
}
