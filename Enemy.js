var Enemy = function (game, key, speed, range, invincible, flyer) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.game = game;

    this.anchor.set(0.5);

    this.exists = false;
    this.targetPlayer = game.player;
    this.invincible = invincible;
    this.flyer = flyer; //this would be use to make the enemy pass through objects

    this.speed = speed;
    this.range = range;

    return this;
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.spawn = function (x, y, HP, points) {

    this.reset(x, y, HP);
    this.scorePoints = points;
    this.scale.set(1);
};

/*Enemy.prototype.update = function() {
	var line = new Phaser.Line(this.x, this.y, this.targetPlayer.x, this.targetPlayer.y);

	var intersect = 
};*/

Enemy.prototype.update = function (layer) {
	var line = new Phaser.Line();
	line.start.set(this.body.x, this.body.y);
	line.end.set(this.targetPlayer.sprite.body.x, this.targetPlayer.sprite.body.y);

	var tileHits = layer.getRayCastTiles(line, 100, true, false);
	if (tileHits.length == 0 || this.flyer)
	{
		var distance = this.game.physics.arcade.distanceBetween(this, 
			this.targetPlayer.sprite);
		if(distance > this.range)
		{
			this.body.moves = true;
			this.moveTo(this.targetPlayer.sprite.x, this.targetPlayer.sprite.y);
		}
		else
		{
			this.body.moves = false;
			//just shoot
		}
	}
	else
	{
		this.body.moves = false;
	}
};

Enemy.prototype.moveTo = function (x, y) {
	this.game.physics.arcade.moveToXY(this, x, y, this.speed);
};

Enemy.prototype.dealDamage = function(dmg) {

	if(this.invincible)
		return;

	this.damage(dmg);

	if(!this.alive)
	{
		this.targetPlayer.addScore(this.scorePoints);
	}
};

//You will use .dealDamage() to deal damage
//From HTML 5 Shoot Em Up In An Afternoon: 
//Using damage() automatically kill()s the 
//sprite once its health is reduced to zero. 
