var Player = function(game, posX, posY, imageName) {
	

	this.sprite = game.add.sprite(posX, posY, imageName);
	this.sprite.anchor.set(0.5);

	this.fireRate = 1000;
	this.nextFire = 0;

	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.MAXSPEED = 500; // player's maximum velocity
    this.ACCELERATION = 1500; // player's maximum acceleration
    this.DRAG = 1000; // player's drag
    this.INPUTMODIFYFACTOR = 0.7071;

    this.sprite.body.maxVelocity.setTo(this.MAXSPEED, this.MAXSPEED); // x, y

    this.sprite.body.drag.setTo(this.DRAG, this.DRAG); // x, y

    this.sprite.body.collideWorldBounds = true;

    this.playerTarget = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'crosshair');
    this.playerTarget.anchor.set(0.5);

    bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;

	bullets.createMultiple(50, 'bullet');
	bullets.setAll('checkWorldBounds', true);
	bullets.setAll('outOfBoundsKill', true);

    this.setControls(game);

    game.camera.follow(this.sprite);

};

Player.prototype.setControls = function(game) {
	this.leftControl = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.upControl = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.rightControl = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.downControl = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.spaceControl = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};

Player.prototype.movePlayer = function() {
	 if (this.leftControl.isDown) // moving left
        {         
            if (this.upControl.isDown) // moving up
            {
               this.sprite.body.acceleration.x = -this.ACCELERATION * this.INPUTMODIFYFACTOR;
               this.sprite.body.acceleration.y = -this.ACCELERATION * this.INPUTMODIFYFACTOR;
            }
            else if (this.downControl.isDown) // moving down
            {
               this.sprite.body.acceleration.x = -this.ACCELERATION * this.INPUTMODIFYFACTOR;
               this.sprite.body.acceleration.y = this.ACCELERATION * this.INPUTMODIFYFACTOR;
            }
            else
            {
                this.sprite.body.acceleration.x = -this.ACCELERATION;
                this.sprite.body.acceleration.y = 0;
            }
        }
        else if (this.rightControl.isDown) // moving right
        {

            if (this.upControl.isDown)  // moving up
            {
                this.sprite.body.acceleration.x = this.ACCELERATION * this.INPUTMODIFYFACTOR;
                this.sprite.body.acceleration.y = -this.ACCELERATION * this.INPUTMODIFYFACTOR;
            }
            else if (this.downControl.isDown)  // moving down
            {
                this.sprite.body.acceleration.x = this.ACCELERATION * this.INPUTMODIFYFACTOR;
                this.sprite.body.acceleration.y = this.ACCELERATION * this.INPUTMODIFYFACTOR;
            }
            else
            {
                this.sprite.body.acceleration.x = this.ACCELERATION;
                this.sprite.body.acceleration.y = 0;
            }
        }
        else
        {
            if (this.upControl.isDown)  // moving up
            {
                this.sprite.body.acceleration.x = 0;
                this.sprite.body.acceleration.y = -this.ACCELERATION;
            }
            else if (this.downControl.isDown)  // moving down
            {
                this.sprite.body.acceleration.x = 0;
                this.sprite.body.acceleration.y = this.ACCELERATION;
            }
            else
            {
                this.sprite.body.acceleration.x = 0;
                this.sprite.body.acceleration.y = 0;
            }
        }
};

Player.prototype.playerShoot = function(game) {

    if(game.input.activePointer.isDown || this.spaceControl.isDown)
    {
    	//handle the bullet creation and firing
    	this.fire(game);
   }
};

Player.prototype.updatePlayerTarget = function(game) {
    	this.playerTarget.x = game.camera.x + game.input.mousePointer.x;
    	this.playerTarget.y = game.camera.y + game.input.mousePointer.y;

 	};


Player.prototype.fire = function(game) {
    if (game.time.now > game.player.nextFire && bullets.countDead() > 0)
    {
	    game.player.nextFire = game.time.now + game.player.fireRate;

	    var bullet = bullets.getFirstDead();

	    bullet.reset(game.player.sprite.x, game.player.sprite.y);

	    bullet.rotation = game.physics.arcade.moveToPointer(bullet, 300);
    }
};

Player.prototype.update = function(game) {

	this.movePlayer();
	this.playerShoot(game);
	this.updatePlayerTarget(game);
};