
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

var gameThat;

BasicGame.Game.prototype = {

    create: function () {

        gameThat = this;

        this.MAPWIDTH = 100;
        this.MAPHEIGHT = 100;
        this.mapData = [this.MAPWIDTH * this.MAPHEIGHT];

        this.rotMap = new ROT.Map.Cellular(this.MAPWIDTH, this.MAPHEIGHT);
        this.rotMap.randomize(0.5);
        for (var iterations = 0; iterations < 5; iterations++)
        {
            this.rotMap.create();
        }
        
        var mapCallback = function(x, y, value)
        {
            gameThat.mapData[gameThat.array2DTo1D(x, y, gameThat.MAPWIDTH)] = value;
        };
        this.rotMap.create(mapCallback);

        this.stage.backgroundColor = '#2d2d2d';

        this.map = this.add.tilemap();

        this.map.addTilesetImage('tileset1');

        this.map.setCollision(1);

        this.layer = this.map.create('level1', this.MAPWIDTH, this.MAPHEIGHT, 32, 32);

        for (var x = 0; x < this.MAPWIDTH; x++)
        {
            for (var y = 0; y < this.MAPWIDTH; y++)
            {
                this.map.putTile(this.mapData[gameThat.array2DTo1D(x, y, gameThat.MAPWIDTH)], x, y, this.layer);
            }
        }

        this.layer.resizeWorld();

        //this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
        //this.logo.anchor.setTo(0.5, 0.5);

        //this.textBox = new TextBox(this, testingText, 'textBG', Phaser.Keyboard.DOWN, this.world.centerX, this.world.centerY, 0, true, true, { font: "30px Arial", fill: "#4400ff", align: "center" });

        this.physics.startSystem(Phaser.Physics.ARCADE);

        /*this.player = this.add.sprite(this.world.centerX, this.world.centerY, 'player');
        this.player.anchor.set(0.5);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.MAXSPEED = 500; // player's maximum velocity
        this.player.ACCELERATION = 1500; // player's maximum acceleration
        this.player.DRAG = 1000; // player's drag
        this.INPUTMODIFYFACTOR = 0.7071;

        this.player.body.maxVelocity.setTo(this.player.MAXSPEED, this.player.MAXSPEED); // x, y

        this.player.body.drag.setTo(this.player.DRAG, this.player.DRAG); // x, y*/

        // this.player = new Player(this, this.world.centerX, this.world.centerY, 'player');
        this.player = new Player(this, 50, 50, 'player');

        

    },

    update: function () {

        this.physics.arcade.collide(this.player.sprite, this.layer);

        this.player.update(this);

        //this.updatePlayerTarget();
        //this.movePlayer();
        //this.playerShoot();
    },

    

    

    

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },

    array2DTo1D: function (x, y, rowWidth)
    {
        return x + rowWidth * y;
    },

    array1DTo2D: function (i, rowWidth)
    {
        return {x: Math.floor(i % rowWidth), y: Math.floor(i / rowWidth)};
    }

};
