var EnemyWeapon = {};

EnemyWeapon.EnemySingleBullet = function (game, damage, sfx) {

    Phaser.Group.call(this, game, game.world, 'Single Bullet', 
        false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;
    this.sfx = sfx;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'arrow', damage), true, true);
    }

    return this;

};


EnemyWeapon.EnemySingleBullet.prototype = Object.create(Phaser.Group.prototype);
EnemyWeapon.EnemySingleBullet.prototype.constructor = Weapon.EnemySingleBullet;

EnemyWeapon.EnemySingleBullet.prototype.fire = function (source, xTarget, yTarget) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y + 10;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 
    	xTarget, yTarget);

    this.sfx.play();

    this.nextFire = this.game.time.time + this.fireRate;

};

var Enemy = function (game, key, speed, range, damage,invincible, flyer, sfx) {


    Phaser.Sprite.call(this, game.game, 0, 0, key);

    this.animations.add('walk', [2 ,3 , 4, 5], 15, true);
    this.animations.add('attack', [0, 1], 15, true);
    this.animations.add('idle', [2], 15, false);

    this.animations.play('idle');

    this.game = game;

    this.anchor.set(0.5);

    this.exists = false;
    this.targetPlayer = game.player;
    this.invincible = invincible;
    this.flyer = flyer; //this would be use to make the enemy pass through objects

    this.speed = speed;
    this.range = range;

    this.stunStacks = 0;

    this.damageOverTime = 0;
    this.damageOverTimeStacks = 0;

    this.weaknessStacks = 0;
    this.weakness = 0;

    this.hitSFX = game.add.audio('enemyHit', 0.4, false);

    this.weapon = new EnemyWeapon.EnemySingleBullet(game, damage, sfx);
    this.weapon.enableBody = true;
    this.weapon.physicsBodyType = Phaser.Physics.ARCADE;

    this.facingRight;

    return this;
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.spawn = function (x, y, HP, points) {

    this.reset(x, y, HP);
    //this.animations.play('idle');
    this.damageOverTimeStacks = 1;
    this.removeDot();
    this.scorePoints = points;
    this.stunStacks = 0;
    this.scale.set(1);
};

Enemy.prototype.update = function (layer) {

	if(!this.alive || this.stunStacks > 0) return;

	if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0)
	{
		if (this.body.velocity.x > 0)
		{
			this.facingRight = true;
		}
		else if (this.body.velocity.x < 0)
		{
			this.facingRight = false;
		}
	}


	var line = new Phaser.Line();
	line.start.set(this.body.x, this.body.y);
	line.end.set(this.targetPlayer.sprite.body.x, this.targetPlayer.sprite.body.y);

	this.game.physics.arcade.overlap(this.weapon, this.targetPlayer.sprite, 
    	this.targetPlayer.getHit, null, this);

	var tileHits = layer.getRayCastTiles(line, 100, true, false);
	if (tileHits.length == 0 || this.flyer)
	{
		var distance = this.game.physics.arcade.distanceBetween(this, 
			this.targetPlayer.sprite);
		if (this.targetPlayer.sprite.x > this.x)
			this.facingRight = true;
		else if (this.targetPlayer.sprite.x < this.x)
			this.facingRight = false;
		if(distance > this.range)
		{
			this.body.moves = true;
			this.moveTo(this.targetPlayer.sprite.x, this.targetPlayer.sprite.y);
			this.animations.play('walk');
		}
		else
		{
			this.body.moves = false;
			this.fire();
			this.animations.play('attack');
			//just shoot
		}
	}
	else
	{
		this.body.moves = false;
		this.animations.play('idle');
	}

	if (this.facingRight === true)
		this.scale.set(-1, 1);
	else
		this.scale.set(1, 1);
};

Enemy.prototype.moveTo = function (x, y) {
	this.game.physics.arcade.moveToXY(this, x, y, this.speed);
};

Enemy.prototype.fire = function() {
	if (this.targetPlayer.sprite.alive)
	{
		this.weapon.fire(this, this.targetPlayer.sprite.x, 
		this.targetPlayer.sprite.y);
	}
	
};
Enemy.prototype.dealDamage = function(dmg) {
	var dam = (1 + this.weakness) * dmg;
	this.damage(dam);

	if(!this.alive)
	{
		var chance = this.game.rnd.integerInRange(1, 10);

		if(chance == 1)
		{
			this.game.spawnPickup(this.x, this.y);
		}
	}
}

Enemy.prototype.dealDot = function() {
	this.dealDamage(this.damageOverTime);
};

Enemy.prototype.removeDot = function() {
	this.damageOverTimeStacks--;
	if(this.damageOverTimeStacks == 0)
	{
		this.tint = 0xffffff;
		this.damageOverTime = 0;
	}
};

Enemy.prototype.removeStun = function() {
	//this.stunned = false;
	this.stunStacks--;
	if(this.stunStacks == 0)
	{
		this.tint = 0xffffff;
		this.damageOverTime = 0;
		this.body.moves = true;
	}
};

Enemy.prototype.removeWeak = function(){
	this.weaknessStacks--;
	if(this.weaknessStacks == 0)
	{
		this.tint = 0xffffff;
		this.weakness = 0;
	}
}


//You will use .dealDamage() to deal damage
//From HTML 5 Shoot Em Up In An Afternoon: 
//Using damage() automatically kill()s the 
//sprite once its health is reduced to zero. 
