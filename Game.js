
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        //this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
        //this.logo.anchor.setTo(0.5, 0.5);

        //this.textBox = new TextBox(this, testingText, 'textBG', Phaser.Keyboard.DOWN, this.world.centerX, this.world.centerY, 0, true, true, { font: "30px Arial", fill: "#4400ff", align: "center" });

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = this.add.sprite(this.world.centerX, this.world.centerY, 'player');
        this.player.anchor.set(0.5);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.MAXSPEED = 500; // player's maximum velocity
        this.player.ACCELERATION = 1500; // player's maximum acceleration
        this.player.DRAG = 1000; // player's drag
        this.INPUTMODIFYFACTOR = 0.7071;

        this.player.body.maxVelocity.setTo(this.player.MAXSPEED, this.player.MAXSPEED); // x, y

        this.player.body.drag.setTo(this.player.DRAG, this.player.DRAG); // x, y

        this.setControls();

    },

    setControls: function () {
        this.leftControl = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.upControl = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.rightControl = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.downControl = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.movePlayer();

    },

    movePlayer: function () {


        if (this.leftControl.isDown) // moving left
        {         
            if (this.upControl.isDown) // moving up
            {
               this.player.body.acceleration.x = -this.player.ACCELERATION * this.INPUTMODIFYFACTOR;
               this.player.body.acceleration.y = -this.player.ACCELERATION * this.INPUTMODIFYFACTOR;
            }
            else if (this.downControl.isDown) // moving down
            {
               this.player.body.acceleration.x = -this.player.ACCELERATION * this.INPUTMODIFYFACTOR;
               this.player.body.acceleration.y = this.player.ACCELERATION * this.INPUTMODIFYFACTOR;
            }
            else
            {
                this.player.body.acceleration.x = -this.player.ACCELERATION;
                this.player.body.acceleration.y = 0;
            }
        }
        else if (this.rightControl.isDown) // moving right
        {

            if (this.upControl.isDown)  // moving up
            {
                this.player.body.acceleration.x = this.player.ACCELERATION * this.INPUTMODIFYFACTOR;
                this.player.body.acceleration.y = -this.player.ACCELERATION * this.INPUTMODIFYFACTOR;
            }
            else if (this.downControl.isDown)  // moving down
            {
                this.player.body.acceleration.x = this.player.ACCELERATION * this.INPUTMODIFYFACTOR;
                this.player.body.acceleration.y = this.player.ACCELERATION * this.INPUTMODIFYFACTOR;
            }
            else
            {
                this.player.body.acceleration.x = this.player.ACCELERATION;
                this.player.body.acceleration.y = 0;
            }
        }
        else
        {
            if (this.upControl.isDown)  // moving up
            {
                this.player.body.acceleration.x = 0;
                this.player.body.acceleration.y = -this.player.ACCELERATION;
            }
            else if (this.downControl.isDown)  // moving down
            {
                this.player.body.acceleration.x = 0;
                this.player.body.acceleration.y = this.player.ACCELERATION;
            }
            else
            {
                this.player.body.acceleration.x = 0;
                this.player.body.acceleration.y = 0;
            }
        }

        


    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
