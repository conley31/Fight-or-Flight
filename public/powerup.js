function rapidFire(x, y, value) {
	this.x = x;
	this.y = y;
	this.r = 30;
	this.value = value;
	this.powerupID = numOfPowerups;
	numOfPowerups++;
}

function speedUp(x, y) {
	this.x = x;
	this.y = y;
	this.r = 30;
	this.powerupID = numOfPowerups;
	numOfPowerups;
}
speedUp.prototype = {
	draw: function() {
		this.y = this.y + 5;
		if (this.y > h) {
			delete powerups[this.powerupID];
			return;
		}
		var posX = this.x;
		var posY = this.y;
		ctx.beginPath();
		ctx.fillStyle = "#00FF00";
		ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		ctx.fill();
		ctx.closePath();
		ctx.font = '16px Arial';
		ctx.fillStyle = '#000';
		ctx.textAlign = 'center';
		ctx.fillText("Speed Up", this.x, this.y);
	},
	collision: function() {
		for (i = 0; i < numOfPlayers; i++) {
			if (!players[i].destroyed) {
				if (this.x > players[i].x && this.x < (players[i].x + players[i].width) && this.y > (players[i].y - players[i].height)) {
					console.log(players[i].delay);
					if (players[i].speed < 13) {
						players[i].speed++;
					}
					delete powerups[this.powerupID];
					return;
				}
			}
		}
	}
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
		for (i = 0; i < numOfPlayers; i++) {
			if (!players[i].destroyed) {
				if (this.x > players[i].x && this.x < (players[i].x + players[i].width) && this.y > (players[i].y - players[i].height)) {
					console.log(players[i].delay);
					if (players[i].delay > 75) {
						players[i].delay -= 25;
						console.log(players[i].delay);
					}
					delete powerups[this.powerupID];
					return;
				}
			}
		}
	}
}
