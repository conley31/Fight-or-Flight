var numOfPlayers = 0;
var colors = ["#0095DD", "#D3D3D3"];
var d = new Date();

function Player(username){
	this.x = w / 2;
	this.y = h;
	this.hp = 1;
	this.destroyed = false;
	this.width = 40;
	this.height = 40;
	this.score = 0;
	if (username == "dev0") {
		this.delay = 25;
		this.speed = 10;
	} else {
		this.delay = 200;
		this.speed = 6;
	}
	this.playerID = numOfPlayers;
	numOfPlayers++;
	this.username = username;
	this.keys = new KeySetup();
	this.prevShot = d.getTime();
	this.state = "NOT_RUNNING";
}

Player.prototype = {
	x: 0,
	y: 0,
	width: 40,
	height: 40,
	running: 0,
	draw: function() {
		if (this.hp == 0) {
			this.destroyed = true;
			return;
		}
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
        	ctx.textAlign = 'left';
        	if(this.username.length > 5){
        		var test = this.username.substring(0, 5) + "..";
        		ctx.fillText(test, this.x+4, h-10);
        	}
        	else {
        		ctx.fillText(this.username, this.x + 4, h-10);
        	}
	},
	positionIncreaseX: function() {
		this.x += this.speed;
		if ((this.x + this.width) > w) {
			this.x = (w - this.width);
		}
		//return this.x;
	},
	positionDecreaseX: function() {
		this.x -= this.speed;
		if (this.x < 0) {
			this.x = 0;
		}
		//return this.y;
	},
	shotDelay: function() {
		var curr = new Date();
		if (this.prevShot + this.delay < curr.getTime()) {
			this.prevShot = curr.getTime();
			return true;
		}
		return false;
	},
	shoot: function() {
		var proj = new Projectile(this.x + (this.width / 2), this.y - this.height, this.playerID);
		projectiles.push(proj);
	},
	collision: function() {
		for (i = 0; i < numOfEnemies; i++) {
			if (enemies[i] != null) {
				if ((this.x + (this.width / 2)) > enemies[i].x && (this.x + (this.width / 2)) < (enemies[i].x + enemies[i].width) && (this.y - this.height) < (enemies[i].y + enemies[i].height)) {
					//this.hp--;
					//enemies[i].hp--;
				}
			}
		}
	}
};
