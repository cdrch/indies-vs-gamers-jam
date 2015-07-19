var that2;
var Weapon = {};

Weapon.SingleBullet = function (game, damage) {

    Phaser.Group.call(this, game, game.world, 'Single Bullet', 
        false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet', damage), true, true);
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

Weapon.CircleBullet = function (game, damage) {

    Phaser.Group.call(this, game, game.world, 'Circle Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 500;

    for (var i = 0; i < 250; i++)
    {
        this.add(new Bullet(game, 'bullet', damage), true, true);
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

    this.initialx = posX;
    this.initialy = posY;

    this.sprite.health = 100;
    // animations
    
    this.sprite.animations.add('idle', [0], 15, false);
    this.sprite.animations.add('run', [0, 1, 2, 3], 25, true);
    this.facing = 'right';
    this.running = false;

    this.sprite.animations.play('idle');

	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.MAXSPEED = 300; // player's maximum velocity

    this.sprite.body.collideWorldBounds = true;


    this.playerTarget = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'crosshair');
    this.playerTarget.anchor.set(0.5);

    this.setControls(game);

    game.camera.follow(this.sprite);



    this.weapons = [];
    this.currentWeapon = 0;
    this.weaponName = null;


    this.weapons.push(new Weapon.CircleBullet(game, 20));
    this.weapons.push(new Weapon.SingleBullet(game, 10));

    
    
    for (var i = 1; i < this.weapons.length; i++)
    {
        this.weapons[i].visible = false;
        this.weapons[i].enableBody = true;
        this.weapons[i].physicsBodyType = Phaser.Physics.ARCADE;
    }

    var changeKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    changeKey.onDown.add(this.nextWeapon, this);

    this.bubble = game.add.sprite(this.sprite.x, this.sprite.y, 'transparentBubble');
    this.bubble.anchor.set(0.5);
    game.physics.enable(this.bubble, Phaser.Physics.ARCADE);
    this.bubble.exists = false;

    this.multiplier = 1;
    this.score = 0;
    this.lives = 3;

    this.scoreText = game.add.text(
    game.camera.position.x, game.camera.position.y - game.camera.height / 2 + 30, 
    '' + this.score, 
    { font: '20px monospace', fill: '#fff', align: 'center' });
    this.livesText = game.add.text(
    game.camera.position.x, game.camera.position.y - game.camera.height / 2 + 70, 
    '' + this.lives, 
    { font: '20px monospace', fill: '#fff', align: 'center' });

    this.scoreText.anchor.setTo(0.5, 0.5);
    this.scoreText.fixedToCamera = true;

    this.livesText.anchor.setTo(0.5, 0.5);
    this.livesText.fixedToCamera = true;



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

    if (magnitude !== 0)
    {
        xInput = xInput / magnitude;
        yInput = yInput / magnitude;
    }    

    this.sprite.body.velocity.x = xInput * this.MAXSPEED;
    this.sprite.body.velocity.y = yInput * this.MAXSPEED;

    var temp = (magnitude !== 0);

    if ( magnitude !== 0 && !this.running)
    {
        this.sprite.animations.play('run');
        this.running = true;
    }
    else if (magnitude === 0 && this.running)
    {
        this.sprite.animations.play('idle');
        this.running = false;
    }

    if (this.playerTarget.x < this.sprite.x 
        && this.facing == 'right')
    {
        this.facing = 'left';
    }
    else if (this.playerTarget.x > this.sprite.x  
        && this.facing == 'left')
    {
        this.facing = 'right';
    }

    if (this.facing == 'left')
        this.sprite.scale.set(-1, 1);
    else
        this.sprite.scale.set(1, 1);
};

Player.prototype.playerShoot = function(game) {

    if(game.input.activePointer.isDown)
    {
    	//handle the bullet creation and firing
    	this.weapons[this.currentWeapon].fire(this);
   }
};

Player.prototype.updatePlayerTarget = function(game) {
    if (this.sprite.alive)
    {
        this.playerTarget.x = game.camera.x + game.input.mousePointer.x;
        this.playerTarget.y = game.camera.y + game.input.mousePointer.y;
    }
	else
    {
        this.playerTarget.x = game.camera.x - 96;
        this.playerTarget.y = game.camera.y - 96;
    }

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
        this.player.sprite.health += amount;
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


Player.prototype.getHit = function(player, bullet)
{
    player.damage(bullet.hitDamage);
    bullet.kill();
};

Player.prototype.update = function(game) {
    //this.updateScorePosition(game);
    if(this.sprite.alive)
    {
        this.movePlayer(game);
        this.playerShoot(game);
    }
    else
    {
        if (!this.bubble.exists)
        {
            this.respawn(game);            
        }    
        if (this.bubble.exists && this.bubble.x >= this.initialx - 10 && this.bubble.x <= this.initialx + 10 && this.bubble.y >= this.initialy - 10 && this.bubble.y <= this.initialy + 10)
        {
            this.sprite.x = this.bubble.x;
            this.sprite.y = this.bubble.y;
            this.sprite.revive(100);
            game.camera.follow(this.sprite);
            this.bubble.exists = false;
        }    
    }

	this.updatePlayerTarget(game);
};

Player.prototype.respawn = function(game) {
    this.lives--;
    this.livesText.setText('' + this.lives);
    if (this.lives > 0)
    {    
        this.bubble.x = this.sprite.x;
        this.bubble.y = this.sprite.y;
        this.bubble.exists = true;
        game.camera.follow(this.bubble);

        game.physics.arcade.moveToXY(this.bubble, this.initialx, this.initialy, 50, 1000);
    }
    else
    {
        // game over
    }
    

};