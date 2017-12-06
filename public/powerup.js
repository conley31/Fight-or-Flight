function rapidFire(x, y, value) {
	this.x = x;
	this.y = y;
	this.r = 30;
	this.value = value;
	this.powerupID = numOfPowerups;
	numOfPowerups++;
}

rapidFire.prototype = {
	draw: function() {
		this.y = this.y + 5;
		if (this.y > h) {
			delete powerups[this.powerupID];
			return;
		}
		var posX = this.x;
		var posY = this.y;
		ctx.beginPath();
		ctx.fillStyle = "#FFFF00";
		ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		ctx.fill();
		ctx.closePath();
		ctx.font = '16px Arial';
		ctx.fillStyle = '#000';
		ctx.textAlign = 'center';
		ctx.fillText("Gun Up", this.x, this.y);
	},
	collision: function() {
		for (i = 0; i < numOf
	}
}
