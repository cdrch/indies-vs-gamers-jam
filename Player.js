var that2;
var Weapon = {};

Weapon.SingleBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet'), true, true);
    }

    return this;

};


Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.sprite.x + 10;
    var y = source.sprite.y + 10;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, source.playerTarget.x, source.playerTarget.y);

    this.nextFire = this.game.time.time + this.fireRate;

};

var Player = function(game, posX, posY, imageName) {
	that2 = this;

	this.sprite = game.add.sprite(posX, posY, imageName);
	this.sprite.anchor.set(0.5);

	this.fireRate = 1000;
	this.nextFire = 0;

	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.MAXSPEED = 500; // player's maximum velocity

    this.sprite.body.collideWorldBounds = true;


    this.playerTarget = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'crosshair');
    this.playerTarget.anchor.set(0.5);

    this.setControls(game);

    game.camera.follow(this.sprite);



    this.weapons = [];
    this.currentWeapon = 0;
    this.weaponName = null;

    this.weapons.push(new Weapon.SingleBullet(game));

    
    
    for (var i = 1; i < this.weapons.length; i++)
    {
        this.weapons[i].visible = false;
    }

};

Player.prototype.setControls = function(game) {
	this.leftControl = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.upControl = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.rightControl = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.downControl = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.spaceControl = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};

Player.prototype.movePlayer = function(game) {
    
    var xInput = 0;
    var yInput = 0;

    if (this.leftControl.isDown)
    {
        xInput = -1;
    }
    else if (this.rightControl.isDown)
    {
        xInput = 1;
    }

    if (this.upControl.isDown)
    {
        yInput = -1;
    }
    else if (this.downControl.isDown)
    {
        yInput = 1;
    }

    var magnitude = Math.sqrt((xInput * xInput) + (yInput * yInput));

    xInput = xInput / magnitude;
    yInput = yInput / magnitude;

    this.sprite.body.velocity.x = xInput * this.MAXSPEED;
    this.sprite.body.velocity.y = yInput * this.MAXSPEED;

};

Player.prototype.playerShoot = function(game) {

    if(game.input.activePointer.isDown || this.spaceControl.isDown)
    {
    	//handle the bullet creation and firing
    	this.weapons[this.currentWeapon].fire(this);
   }
};

Player.prototype.updatePlayerTarget = function(game) {
    	this.playerTarget.x = game.camera.x + game.input.mousePointer.x;
    	this.playerTarget.y = game.camera.y + game.input.mousePointer.y;

 	};

Player.prototype.update = function(game) {

	this.movePlayer(game);
	this.playerShoot(game);
	this.updatePlayerTarget(game);
};