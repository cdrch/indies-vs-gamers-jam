ArcaneArcade.Game = function (game) {

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
    //  

};

var gameThat;

var Spawner = {};

Spawner.BasicEnemy = function (game, x, y, HP, imgName) {

    Phaser.Group.call(this, game, game.world, 
        'Basic Enemy', false, true, Phaser.Physics.ARCADE);

    this.spawningTime = 1000;
    this.nextSpawn = 0;
    this.spawnHP = 30;

    this.sprite = game.add.sprite(x, y, imgName);
    this.sprite.anchor.set(0.5);

    this.sprite.reset(x, y, HP);

    this.maximumEnemies = 2;

    for(var i = 0; i < this.maximumEnemies; i++)
    {
        this.add(new Enemy(game, 'BasicEnemy', 50, 250, 20), true, true);
    }

    return this;
};

Spawner.BasicEnemy.prototype = Object.create(Phaser.Group.prototype);
Spawner.BasicEnemy.prototype.constructor = Spawner.BasicEnemy;

Spawner.BasicEnemy.prototype.spawn = function () {

    if (this.game.time.time < this.nextSpawn) { return; }

    var first = this.getFirstExists(false);

    if(first == null)
        return;

    first.spawn(this.sprite.x + this.game.rnd.integerInRange(-30, 30), 
        this.sprite.y + this.game.rnd.integerInRange(-30, 30), 
        this.spawnHP, 250);

    this.nextSpawn = this.game.time.time + this.spawningTime;

};

Spawner.BasicEnemy.prototype.update = function() {
    if(!this.sprite.alive) return;
    this.spawn();
};

ArcaneArcade.Game.prototype = {

    getCurrentLevelInfo: function (level) {
        switch(level)
        {
            case 1:
                return this.gameInfo.level.one;
            case 2:
                return this.gameInfo.level.two;
            case 3:
                return this.gameInfo.level.three;
            case 4:
                return this.gameInfo.level.four;
            case 5:
                return this.gameInfo.level.five;
            default:
                console.log ("NO LEVEL");
                // maybe randomly pick a tough level for infinite score attack?
        }
    },

    create: function () {        

        gameThat = this;

        this.TILESIZEX = 128;
        this.TILESIZEY = 128;

        this.MAPWIDTH = 30;
        this.MAPHEIGHT = 30;

        this.gameInfo = this.cache.getJSON('gameInfo');

        this.currentLevel = this.getCurrentLevelInfo(ArcaneArcade.currentLevel);     

        console.log(ArcaneArcade.currentLevel);   

        switch (this.currentLevel.type)
        {
            case "0":
                this.loadPremadeLevel(this.TILESIZEX, this.TILESIZEY, this.currentLevel.fileName);
                this.map.setCollision(2);
                break;
            case "1":
                this.createRandomMapDisplay(this.MAPWIDTH, this.MAPHEIGHT, this.TILESIZEX, this.TILESIZEY, this.currentLevel.tileset, "Digger");
                this.map.setCollision(1);
                this.map.setCollision(2);
                break;
            case "2":
                this.createRandomMapDisplay(this.MAPWIDTH, this.MAPHEIGHT, this.TILESIZEX, this.TILESIZEY, this.currentLevel.tileset, "Cave");
                this.map.setCollision(1);
                break;
            case "3":
                this.createRandomMapDisplay(this.MAPWIDTH, this.MAPHEIGHT, this.TILESIZEX, this.TILESIZEY, this.currentLevel.tileset, "Maze");
                this.map.setCollision(1);
                break;
            default:
                this.createRandomMapDisplay(this.MAPWIDTH, this.MAPHEIGHT, this.TILESIZEX, this.TILESIZEY, this.currentLevel.tileset, "Digger");
                this.map.setCollision(1);
        }  

        //this.stage.backgroundColor = '#1111FF'; // use for debugging - if you can see this bright blue color, then something is wrong
       

        //this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
        //this.logo.anchor.setTo(0.5, 0.5);

        //this.textBox = new TextBox(this, testingText, 'textBG', Phaser.Keyboard.DOWN, this.world.centerX, this.world.centerY, 0, true, true, { font: "30px Arial", fill: "#4400ff", align: "center" });

        var startX = 0;
        var startY = 0;

        if (this.currentLevel.type === "0")
        {
            startX = this.currentLevel.startX;
            startY = this.currentLevel.startY;
        }

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

            
            if (xCheck > this.MAPWIDTH * 0.5 && yCheck > this.MAPWIDTH * 0.5)
            {
                xCheck = 0;
                yCheck = 0;
                while (startX === 0 || startY === 0)
                {
                    if (this.mapData[this.array2DTo1D(xCheck, yCheck, this.MAPWIDTH)] === 0)
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
            }
        }


        this.nextLevelButton = this.input.keyboard.addKey(Phaser.Keyboard.N);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.pickups = this.add.group();

        this.pickups.enableBody = true;
        this.pickups.physicsBodyType = Phaser.Physics.ARCADE;

        this.player = new Player(this, startX * this.TILESIZEX + this.TILESIZEX * 0.5, startY * this.TILESIZEY + this.TILESIZEY * 0.5, 'player');


        var p = this.pickups.create(100, 100, 'pointsPickup');
        p.amount = 3000;
        p.name = p.key;

        this.enemyGroup = [];

        this.spawners = [];
        this.spawner1 = new Spawner.BasicEnemy(this, 200, 200, 500,'spawner');
        this.pickups.physicsBodyType = Phaser.Physics.ARCADE;
        //this.spawner1.sprite.physicsBodyType = Phaser.Physics.ARCADE;
        //this.spawner1.sprite.enableBody = true;
        this.physics.enable(this.spawner1.sprite, 
            Phaser.Physics.ARCADE, true);

        this.spawners.push(this.spawner1);

        this.spawner1.forEach(function (enemy) {
            this.enemyGroup.push(enemy);
        }, this);


        this.door = new Door(this, 'door', 200, 200);




    },

    loadPremadeLevel: function (tileWidth, tileHeight, fileName) {
        this.map = this.add.tilemap(fileName);

        this.map.addTilesetImage('orangetest', 'orangetest', tileWidth, tileHeight);

        //this.setMapCollision();

        this.layer = this.map.createLayer(0);

        this.map.setCollisionBetween(2, 2, true);

        

        this.layer.resizeWorld();
    },

    createRandomMapDisplay: function (width, height, tileWidth, tileHeight, tileset, type) {

        switch (type)
        {
            case "Digger":
                this.mapData = this.createRandomDiggerMapData(); // creates the raw data for maps
                break;
            case "Cave":
                this.mapData = this.createRandomCaveMapData(); // creates the raw data for maps
                break;
            case "Maze":
                this.mapData = this.createRandomMazeMapData(); // creates the raw data for maps
                break;
            default:
                this.mapData = this.createRandomDiggerMapData(); // creates the raw data for maps                
        }
        

        this.map = this.add.tilemap();

        this.map.addTilesetImage(tileset, tileset, tileWidth, tileHeight);

        for (var x = 0; x < width; x++)
        {
            for (var y = 0; y < height; y++)
            {
                if (this.mapData[gameThat.array2DTo1D(x, y, width)] === 1 && 
                    this.mapData[gameThat.array2DTo1D(x, y+1, width)] !== undefined && 
                    this.mapData[gameThat.array2DTo1D(x, y+1, width)] === 0)
                {
                    this.mapData[gameThat.array2DTo1D(x, y, width)] = 2;
                }                
            }
        }

        //this.setMapCollision();

        this.layer = this.map.create('level1', width, height, tileWidth, tileHeight);

        for (var x = 0; x < width; x++)
        {
            for (var y = 0; y < height; y++)
            {
                this.map.putTile(this.mapData[gameThat.array2DTo1D(x, y, width)], x, y, this.layer);
            }
        }

        this.layer.resizeWorld();
    },

    createRandomDiggerMapData: function () {
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

    createRandomCaveMapData: function () {
        var data = [this.MAPWIDTH * this.MAPHEIGHT];

        this.rotMap = new ROT.Map.Cellular(this.MAPWIDTH, this.MAPHEIGHT);

        var width =  this.MAPWIDTH;
        var height = this.MAPHEIGHT;
        
        
        var mapCallback = function(x, y, value)
        {
            data[gameThat.array2DTo1D(x, y, gameThat.MAPWIDTH)] = ((x == 0 || y == 0 || x == width-1 || y == height-1) ? 1 : value);
        };

        this.rotMap.randomize(0.5);
        for (var iterations = 0; iterations < 10; iterations++)
        {
            this.rotMap.create(mapCallback);
        }

        return data;
    },

    createRandomMazeMapData: function () {
        var data = [this.MAPWIDTH * this.MAPHEIGHT];

        var insideMaze = new ROT.Map.EllerMaze(this.MAPWIDTH, this.MAPHEIGHT);
        var insideMazeData = [this.MAPWIDTH-1 * this.MAPHEIGHT-1];

        //this.rotMap = new ROT.Map.EllerMaze(this.MAPWIDTH, this.MAPHEIGHT);

        var width =  this.MAPWIDTH-1;
        var height = this.MAPHEIGHT-1;
        
        
        var mapCallback = function(x, y, value)
        {
            insideMazeData[gameThat.array2DTo1D(x, y, gameThat.MAPWIDTH)] = value;
        };
        
        insideMaze.create(mapCallback);

        for (var x = 0; x < this.MAPWIDTH; x++)
        {
            for (var y = 0; y < this.MAPHEIGHT; y++)
            {
                if (x === 0 || y === 0 || x === this.MAPWIDTH-1 || y === this.MAPHEIGHT-1)
                {
                    data[gameThat.array2DTo1D(x, y, gameThat.MAPWIDTH)] = 1;
                }
                else
                {
                    data[gameThat.array2DTo1D(x, y, gameThat.MAPWIDTH)] = insideMazeData[gameThat.array2DTo1D(x-1, y-1, gameThat.MAPWIDTH)];
                }
            }
        }

        return data;
    },

    loadMapFromFile: function () {

    },

    update: function () {

        this.door.update();

        if (this.nextLevelButton.isDown)
        {
            this.goToNextLevel();
        }

        this.player.update(this);
        this.enemyGroup.forEach(function (enemy) {
            enemy.update(gameThat.layer);
        }, this);

        this.physics.arcade.overlap(
            this.enemyGroup, this.player.weapons,
            this.dealDmgToEnemy, null, this);

        this.spawners.forEach(function (spawner) {
            this.physics.arcade.overlap(
            spawner.sprite, this.player.weapons,
            this.dealDmgToSpawner, null, this);
        }, this);

        this.physics.arcade.collide(this.player.sprite, this.layer);

        this.physics.arcade.overlap(
            this.player.sprite, this.pickups,
            this.player.collectPickup, null, this);

        this.physics.arcade.collide(this.player.sprite, this.enemyGroup);
        this.physics.arcade.collide(this.layer, this.enemyGroup);
        this.physics.arcade.collide(this.enemyGroup, this.enemyGroup);
    },

    dealDmgToSpawner: function(spawner, bullet)
    {
        bullet.kill();
        spawner.damage(bullet.hitDamage);
    },

    dealDmgToEnemy: function (enemy, bullet)
    {
        bullet.kill();
        if(enemy.invincible)
        return;

        enemy.damage(bullet.hitDamage);

        if(!enemy.alive)
        {
            enemy.targetPlayer.addScore(enemy.scorePoints);
        }
    },

    goToNextLevel: function () {
        ArcaneArcade.currentLevel++;
        this.state.start('Game');
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
    },

    render: function() {
        // call renderGroup on each of the alive members
        //this.enemyGroup.forEach(this.renderGroup, this);
    },

    renderGroup: function (member) {
        this.game.debug.body(member);
    }

};
