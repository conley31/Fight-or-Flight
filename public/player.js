var numOfPlayers = 0;
var colors = ["#0095DD", "#00000"];
var d = new Date();

function Player(username){
	this.x = w / 2;
	this.y = h;
	console.log(this.x);
	console.log(this.y);
	this.width = 40;
	this.height = 40;
	this.score = 0;
	this.playerID = numOfPlayers;
	numOfPlayers++;
	this.username = username;
	this.keys = new KeySetup();
	this.prevShot = d.getTime();
}

Player.prototype = {
	x: 0,
	y: 0,
	width: 40,
	height: 40,
	running: 0,
	draw: function() {
		var posX = this.x;
		var posY = this.y;
		ctx.beginPath();
		ctx.moveTo(posX, posY);
		ctx.lineTo(posX + this.width, posY);
		ctx.lineTo(posX + (this.width / 2), posY - this.height);
		ctx.moveTo(posX + this.width, posY);
		ctx.lineTo(posX - (this.width / 2), posY - this.height);
		ctx.fillStyle = colors[this.playerID];
		ctx.fill();
		ctx.closePath();
		ctx.font = '12px Arial';
        	ctx.fillStyle = '#000';
        	ctx.textAlign = 'center';
        	ctx.fillText(this.username, this.x, h-10);
	},
	positionIncreaseX: function() {
		this.x += 6;
		if ((this.x + this.width) > w) {
			this.x = (w - this.width);
		}
		//return this.x;
	},
	positionDecreaseX: function() {
		this.x -= 6;
		if (this.x < 0) {
			this.x = 0;
		}
		//return this.y;
	},
	shotDelay: function() {
		var curr = new Date();
		if (this.prevShot + 400 < curr.getTime()) {
			this.prevShot = curr.getTime();
			return true;
		}
		return false;
	},
	shoot: function() {
		var proj = new Projectile(this.x + (this.width / 2), this.y - this.height, this.playerID);
		projectiles.push(proj);
	}
};
