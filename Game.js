
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

    create: function () { // something is wrong with 64x64 tile display

        gameThat = this;

        this.gameInfo = this.cache.getJSON('gameInfo');

        // switch (this.gameInfo.levels.1.type)
        // {
        //     case 1:

        // }

        this.TILESIZEX = 128;
        this.TILESIZEY = 128;

        this.MAPWIDTH = 20;
        this.MAPHEIGHT = 20;

        this.createRandomDungeonMap(this.MAPWIDTH, this.MAPHEIGHT, this.TILESIZEX, this.TILESIZEY);

        

        //this.stage.backgroundColor = '#1111FF'; // use for debugging - if you can see this bright blue color, then something is wrong
        
        // create maps

        

        //this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
        //this.logo.anchor.setTo(0.5, 0.5);

        //this.textBox = new TextBox(this, testingText, 'textBG', Phaser.Keyboard.DOWN, this.world.centerX, this.world.centerY, 0, true, true, { font: "30px Arial", fill: "#4400ff", align: "center" });

        this.physics.startSystem(Phaser.Physics.ARCADE);

        var startX = 0;
        var startY = 0;
        var xCheck = 0;
        var yCheck = 0;

        while (startX === 0 || startY === 0)
        {
            if (this.mapData[this.array2DTo1D(xCheck, yCheck, this.MAPWIDTH)] === 0 && 
                this.mapData[this.array2DTo1D(xCheck+1, yCheck, this.MAPWIDTH)] === 0 && 
                this.mapData[this.array2DTo1D(xCheck, yCheck+1, this.MAPWIDTH)] === 0 && 
                this.mapData[this.array2DTo1D(xCheck+1, yCheck+1, this.MAPWIDTH)] === 0)
            {
                startX = xCheck;
                startY = yCheck;
            }
            else
            {
                if (xCheck > yCheck)
                {
                    xCheck = 0;
                    yCheck++;
                }
                else
                {
                    xCheck++;
                }
            }            
        }

        this.player = new Player(this, startX * this.TILESIZEX + this.TILESIZEX * 0.5, startY * this.TILESIZEY + this.TILESIZEY * 0.5, 'player');

        

    },

    prepareRandomMapData: function () {

        var data = [this.MAPWIDTH * this.MAPHEIGHT];

        this.rotMap = new ROT.Map.Digger(this.MAPWIDTH, this.MAPHEIGHT, {dugPercentage: 0.2});
        //this.rotMap.randomize(0.5);
        //for (var iterations = 0; iterations < 5; iterations++)
        //{
            this.rotMap.create();
        //}
        
        var mapCallback = function(x, y, value)
        {
            data[gameThat.array2DTo1D(x, y, gameThat.MAPWIDTH)] = value;
        };
        this.rotMap.create(mapCallback);

        return data;
    },

    createRandomDungeonMap: function (width, height, tileWidth, tileHeight) {

        this.mapData = this.prepareRandomMapData(); // creates the raw data for maps

        this.map = this.add.tilemap();

        this.map.addTilesetImage('tileset128', 'tileset128', tileWidth, tileHeight);

        this.setMapCollision();

        this.layer = this.map.create('level1', width, height, tileWidth, tileHeight);

        for (var x = 0; x < width; x++)
        {
            for (var y = 0; y < height; y++)
            {
                this.map.putTile(this.mapData[gameThat.array2DTo1D(x, y, width)], x, y, this.layer);
                //this.map.random(x, y, 1, 1, this.layer);
            }
        }

        this.layer.resizeWorld();

        for (var x = 0; x < width; x++)
        {
            for (var y = 0; y < height; y++)
            {
                this.map.putTile(this.mapData[gameThat.array2DTo1D(x, y, width)], x, y, this.layer);
            }
        }
    },

    createRandomMazeMap: function () {

    },

    loadMapFromFile: function () {

    },

    setMapCollision: function () {
        this.map.setCollision(1);
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
