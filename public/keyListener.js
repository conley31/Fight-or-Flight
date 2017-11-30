function Key(button){
	this.button = button;
}

Key.prototype = {
	pressed: false
};

function KeySetup(){
	this.up = new Key(38);
	this.down = new Key(40);
	this.left = new Key(37);
	this.right = new Key(39);
	this.space = new Key(32);
}

var keys = new KeySetup();

function getKey(button){
	for(var key in keys){
		if(keys.hasOwnProperty(key)){
			if(keys[key].button == button){
				return keys[key];
			}
		}
	}
}

window.addEventListener('keydown', function(event){
	var listenKey = getKey(event.which);
	if(listenKey){
		draw();
		listenKey.pressed = true;
		event.preventDefault();
	}
});

window.addEventListener('keyup', function(event){
	var listenKey = getKey(event.which);
	if(listenKey){
		listenKey.pressed = false;
		event.preventDefault();
	}
});