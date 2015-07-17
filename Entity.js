var Entity = function (game, x, y, key, frame, hp, movementSpeed)
{
	Phaser.Sprite.call(this, game, x, y, key, frame);
	this.anchor.set(0.5);

	this.hp = hp || 100; // health
	this.movementSpeed = movementSpeed || 1;

	game.add.existing(this);
};

Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.prototype.constructor = Entity;