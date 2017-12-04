var numOfPlayers = 0;
var colors = ["#0095DD", "#ffffff"];

function Player(username){
	this.x = w / 2;
	this.y = h / 2;
	console.log(this.x);
	console.log(this.y);
	this.width = 50;
	this.height = 50;
	this.score = 0;
	this.playerID = numOfPlayers;
	numOfPlayers++;
	this.username = username;
	this.keys = new KeySetup();
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
	width: 50,
	height: 50,
	draw: function() {
		console.log(draw);
		var posX = this.x;
		var posY = this.y;
		ctx.beginPath();
		ctx.moveTo(posX, posY);
		ctx.lineTo(posX + this.width, posY);
		ctx.lineTo(posX + (this.width / 2), posY - this.height);
		ctx.moveTo(posX + this.width, posY);
		ctx.lineTo(posX - (this.width / 2), posY - this.height);
		ctx.fillStyle = colors[this.playerID];
		ctx.fill()
		ctx.closePath();
		ctx.font = '12px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(this.username, this.x, h-10);
	},
	positionIncreaseX: function() {
		this.x += 4;
		console.log("increase");
		//return this.x;
	},
	positionDecreaseX: function() {
		this.x -= 4;
		console.log("deacrease");

		//return this.y;
	}
};
