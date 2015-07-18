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

Weapon.CircleBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Circle Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 500;

    for (var i = 0; i < 250; i++)
    {
        this.add(new Bullet(game, 'bullet'), true, true);
    }

    return this;

};


Weapon.CircleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.CircleBullet.prototype.constructor = Weapon.CircleBullet;

Weapon.CircleBullet.prototype.fire = function (source) {

	var NUMBER_OF_BULLETS = 30;

    if (this.game.time.time < this.nextFire || 
    	this.countDead < NUMBER_OF_BULLETS) 
    		{ return; }


    this.nextFire = this.game.time.time + this.fireRate;

    for(var i = 0; i < NUMBER_OF_BULLETS; i++)
    {
    	this.getFirstExists(false).fireCircle(source.sprite.x,
    	 source.sprite.y, 360 / NUMBER_OF_BULLETS * i,
    	 this.bulletSpeed, 0, 0);
    }


};

var Player = function(game, posX, posY, imageName) {

	this.sprite = game.add.sprite(posX, posY, imageName);
	this.sprite.anchor.set(0.5);

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


    this.weapons.push(new Weapon.CircleBullet(game));
    this.weapons.push(new Weapon.SingleBullet(game));

    
    
    for (var i = 1; i < this.weapons.length; i++)
    {
        this.weapons[i].visible = false;
    }

    var changeKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    changeKey.onDown.add(this.nextWeapon, this);

    this.multiplier = 1;
    this.score = 0;

    this.scoreText = game.add.text(
    game.camera.position.x, game.camera.position.y - game.camera.height / 2 + 30, 
    '' + this.score, 
    { font: '20px monospace', fill: '#fff', align: 'center' });

    this.scoreText.anchor.setTo(0.5, 0.5);
    this.scoreText.fixedToCamera = true;

};

Player.prototype.addScore = function(points) {
    this.score += points * this.multiplier;
    this.scoreText.text = this.score;

};

Player.prototype.nextWeapon = function () {
            //  Tidy-up the current weapon
            /*if (this.currentWeapon > 9)
            {
                this.weapons[this.currentWeapon].reset();
            }
            else
            {
                this.weapons[this.currentWeapon].visible = false;
                this.weapons[this.currentWeapon].callAll('reset', null, 0, 0);
                this.weapons[this.currentWeapon].setAll('exists', false);
            }*/
            //  Activate the new one
            this.currentWeapon++;
            if (this.currentWeapon === this.weapons.length)
            {
                this.currentWeapon = 0;
            }
            this.weapons[this.currentWeapon].visible = true;
            this.weaponName.text = this.weapons[this.currentWeapon].name;
        };

Player.prototype.setControls = function(game) {
	this.leftControl = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.upControl = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.rightControl = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.downControl = game.input.keyboard.addKey(Phaser.Keyboard.S);
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

    if(game.input.activePointer.isDown)
    {
    	//handle the bullet creation and firing
    	this.weapons[this.currentWeapon].fire(this);
   }
};

Player.prototype.updatePlayerTarget = function(game) {
	this.playerTarget.x = game.camera.x + game.input.mousePointer.x;
	this.playerTarget.y = game.camera.y + game.input.mousePointer.y;

};

Player.prototype.updateScorePosition = function(game) {

    this.scoreText.position = game.camera.position;
    this.scoreText.position.y -= game.camera.height / 2 - 30;
};

Player.prototype.collectPickup = function(player, pickup)
{
    if(pickup.name == "multiplierPickup")
    {
        //give player a score multiplier
    }

    if(pickup.name == "healPickup")
    {
        //heals player 
    }

    if(pickup.name == "damagePickup")
    {
        //give bonus damage
    }

    if(pickup.name == "weaponsPickup")
    {
        //upgrade weapons
    }

    if(pickup.name == "pointsPickup")
    {
        this.player.addScore(pickup.amount);
        //give additional points
    }

    pickup.kill();
};

Player.prototype.update = function(game) {
    //this.updateScorePosition(game);
	this.movePlayer(game);
	this.playerShoot(game);
	this.updatePlayerTarget(game);
};