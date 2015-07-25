var EnemyWeapon = {};

EnemyWeapon.SkeletonArrow = function(game, damage, sfx) {
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

EnemyWeapon.SkeletonArrow.prototype = Object.create(Phaser.Group.prototype);
EnemyWeapon.SkeletonArrow.prototype.constructor = Weapon.SkeletonArrow;

EnemyWeapon.SkeletonArrow.prototype.fire = function (source, xTarget, yTarget) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y + 10;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 
    	xTarget, yTarget);

    this.sfx.play();

    this.nextFire = this.game.time.time + this.fireRate;

};

var SkeletonArcher = function(game, key, speed, range, hp,damage)
{
    var sound = game.add.audio('skeletonBow', 0.5, false);

	Enemy.call(this, game, key, speed, range, damage, false, false);

	this.animations.add('walk', [2 ,3 , 4, 5], 15, true);
    this.animations.add('attack', [0, 1], 15, true);
    this.animations.add('idle', [2], 15, false);

    this.animations.play('idle');

    this.shouldPlayAnimation = 'idle';

    this.weapon = new EnemyWeapon.SkeletonArrow(game, damage, sound);

};

SkeletonArcher.prototype = Object.create(Enemy.prototype);
SkeletonArcher.prototype.constructor = SkeletonArcher;

SkeletonArcher.prototype.update = function(layer){

	Enemy.prototype.update.call(this, layer);
	this.animations.play(this.shouldPlayAnimation);
};

