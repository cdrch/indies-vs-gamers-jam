var Player = function(game, posX, posY, imageName) {
	

	this.sprite = game.add.sprite(posX, posY, imageName);
	this.sprite.anchor.set(0.5);

	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.MAXSPEED = 500; // player's maximum velocity
    this.ACCELERATION = 1500; // player's maximum acceleration
    this.DRAG = 1000; // player's drag
    this.INPUTMODIFYFACTOR = 0.7071;

    this.sprite.body.maxVelocity.setTo(this.sprite.MAXSPEED, this.sprite.MAXSPEED); // x, y

    this.sprite.body.drag.setTo(this.sprite.DRAG, this.sprite.DRAG); // x, y

    this.setControls(game);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.fire, game);

};

Player.prototype.setControls = function(game) {
	this.leftControl = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.upControl = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.rightControl = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.downControl = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
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

//Player.prototype.playerShoot = function(game) {

//    if(game.input.activePointer.isDown || this.spaceControl.isDown)
//    {
    	//handle the bullet creation and firing
//    	this.fire();
//    }
//};


Player.prototype.fire = function(game) {
    if (game.time.now > game.nextFire && bullets.countDead() > 0)
    {
	    this.nextFire = game.time.now + this.fireRate;

	    var bullet = bullets.getFirstDead();

	    bullet.reset(this.sprite.x, this.sprite.y);

	    bullet.rotation = game.physics.arcade.moveToPointer(bullet, 300);
    }
};

Player.prototype.update = function(game) {
	this.movePlayer(game);
	//this.playerShoot(game);
};