var numOfPlayers = 0;

function Player(username) {
	this.x = w / 2;
	this.y = h;
	this.width = 5;
	this.height = 5;
	this.score = 0;
	this.playerID = numOfPlayers;
	numOfPlayers++;
	this.username = username;
}
/*
Player.prototype.positionX = function(dx) {
	return this.x + dx;
};
Player.prototype.positionY = function(dy) {
	return this.y + dy;
};
*/
Player.prototype = {
	x: 0,
	y: 0,
	width: 5,
	height: 5,
	draw: function() {
		var posX = this.positionX();
		var posY = this.positionY();
		ctx.beginPath();
		ctx.moveTo(posX, posY);
		ctx.lineTo(posX + width, posY);
		ctx.lineTo(posX + (width / 2), posY + height);
		ctx.moveTo(posX + width, posY);
		ctx.lineTo(posX - (width / 2), posY + height);
		ctx.closePath();
	}
	positionX: function(dx) {
		return this.x + dx;
	}
	positionY: function(dy) {
		return this.y + dy;
	}
};
