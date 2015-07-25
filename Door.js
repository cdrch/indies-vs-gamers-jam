var Door = function (game, key, x, y) {

	this.sprite = game.add.sprite(x, y, 'door');
	this.sprite.anchor.set(0.5);

	//Phaser.Sprite.call(this, game, 0, 0, key);

	this.currentGame = game;

	//this.anchor.set(0.5);

	//this.sprite.enableBody = true;
	//this.sprite.physicsBodyType = Phaser.Physics.ARCADE;

	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	//this.exists = false;
};

//Door.prototype = Object.create(Phaser.Sprite.prototype);
//Door.prototype.constructor = Door;

Door.prototype.update = function() {

	this.currentGame.physics.arcade.overlap(
            this.sprite, this.currentGame.player.sprite,
            this.openDoor, null, this);
};

Door.prototype.openDoor = function() {
	this.currentGame.goToNextLevel();
};