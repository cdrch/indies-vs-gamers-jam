var that2;

var Player = function(game, posX, posY, imageName) {
	that2 = this;

	this.sprite = game.add.sprite(posX, posY, imageName);
	this.sprite.anchor.set(0.5);

	this.fireRate = 1000;
	this.nextFire = 0;

	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.MAXSPEED = 500; // player's maximum velocity
    //this.ACCELERATION = 1500; // player's maximum acceleration
    //this.DRAG = 1000; // player's drag
    //this.INPUTMODIFYFACTOR = 0.7071;

    //this.sprite.body.maxVelocity.setTo(this.MAXSPEED, this.MAXSPEED); // x, y

    //this.sprite.body.drag.setTo(this.DRAG, this.DRAG); // x, y

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

    //game.camera.follow(this.sprite);
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;

};

Player.prototype.setControls = function(game) {
	this.leftControl = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.upControl = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.rightControl = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.downControl = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.spaceControl = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};

Player.prototype.movePlayer = function(game) {
    // var xInput = this.leftControl.isDown ? -1 : 0;
    // xInput += this.rightControl.isDown ? 1 : 0;
    // var yInput = this.upControl.isDown ? -1: 0;
    // yInput += this.downControl.isDown ? 1: 0;
    
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
/*
    var diagonal = (xInput !== 0 && yInput !== 0) ? true : false;

    var xMovement;
    var yMovement;

    if (diagonal)
    {
        xMovement = xInput * this.MAXSPEED * (Math.sqrt(xInput * xInput + yInput * yInput));
        yMovement = yInput * this.MAXSPEED * (Math.sqrt(xInput * xInput + yInput * yInput));
    }
    else
    {
        xMovement = xInput * this.MAXSPEED;
        yMovement = yInput * this.MAXSPEED;
 }
*/

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

	this.movePlayer(game);
	this.playerShoot(game);
	this.updatePlayerTarget(game);
};