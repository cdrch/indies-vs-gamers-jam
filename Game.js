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
    
    this.music = null;

};

var gameThat;

var Spawner = {};

Spawner.BasicEnemy = function (game, x, y, HP, imgName) {

    Phaser.Group.call(this, game, game.world, 
        'Basic Enemy', false, true, Phaser.Physics.ARCADE);

    this.spawningTime = 1000;
    this.nextSpawn = 0;
    this.spawnHP = 30;
    this.firstHP = HP;
    this.isBroken = false;

    

    this.sprite = game.add.sprite(x, y, imgName);
    this.sprite.anchor.set(0.5);

    this.sprite.reset(x, y, HP);

    this.sprite.animations.add('new', [0], 15, false);
    this.sprite.animations.add('broken', [1], 15, false);

    this.maximumEnemies = 2;

    this.sprite.animations.play('new');

    var sound = game.add.audio('skeletonBow', 0.5, false);

    for(var i = 0; i < this.maximumEnemies; i++)
    {
        this.add(new Enemy(game, 'BasicEnemy', 50, 250, gameThat.currentLevel.enemyDamage, false, false, sound), true, true);
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

    if(this.firstHP / this.sprite.health >= 2 && !this.isBroken)
    {
        this.sprite.animations.play('broken');
        this.isBroken = true;
    }

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
            case 6:
                return this.gameInfo.level.choiceOne;
            default:
                return this.gameInfo.level.infiniteChallenge;
                // maybe randomly pick a tough level for infinite score attack?
        }
    },

    create: function () {        

        gameThat = this;

        this.TILESIZEX = 128;
        this.TILESIZEY = 128;

        this.startedFading = 0;
        this.endsFading = 0;

        this.gameInfo = this.cache.getJSON('gameInfo');

        this.currentLevel = this.getCurrentLevelInfo(ArcaneArcade.currentLevel);     


        this.MAPWIDTH = this.currentLevel.width;
        this.MAPHEIGHT = this.currentLevel.height;


        switch (this.currentLevel.type)
        {
            case "0":
                this.loadPremadeLevel(this.TILESIZEX, this.TILESIZEY, this.currentLevel.fileName, this.currentLevel.tileset);
                this.map.setCollision(2);
                this.map.setCollision(3);
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

        var doorPlaced = false;

        var remainingSpawners = this.currentLevel.spawnerCount;

        this.enemyGroup = [];

        this.spawners = [];

        if (this.currentLevel.type !== "0")
        {
            var rooms = this.rotMap.getRooms();

            console.log("Room Count: " + rooms.length);

            for (var i=0; i<rooms.length; i++) {
                var room = rooms[i];

                var leftSide = room.getLeft() * this.TILESIZEX;
                var rightSide = room.getRight() * this.TILESIZEX;
                var topSide = room.getTop() * this.TILESIZEY;
                var bottomSide = room.getBottom() * this.TILESIZEY;


                var randomX = this.rnd.realInRange(leftSide + this.TILESIZEX * 0.5, rightSide + this.TILESIZEX * 0.5);
                var randomY = this.rnd.realInRange(topSide + this.TILESIZEY * 0.5, bottomSide + this.TILESIZEY * 0.5);

                //room.getDoors(drawDoor);
                startX = randomX;
                startY = randomY;

                if (i === 0)
                {


                    this.player = new Player(this, startX, startY, 'player');
                    console.log("Player in room " + i + " at: " + startX + "," + startY);
                }
                else if (!doorPlaced && i === rooms.length-1)
                {
                    // place door

                    this.door = new Door(this, 'door', randomX, randomY);

                    console.log("Door in room " + i + " at: " + this.door.sprite.x + "," + this.door.sprite.y);

                    doorPlaced = true; // the door has now been placed

                    //i--; // this allows the chance of a spawner to be placed in the same room as a door
                }
                else if (!doorPlaced && 
                    i > rooms.length * 0.5 && 
                    Math.random(0, 1) > 0)
                {
                    // place door

                    this.door = new Door(this, 'door', randomX, randomY);

                    console.log("Door in room " + i + " at: " + this.door.sprite.x + "," + this.door.sprite.y);

                    doorPlaced = true; // the door has now been placed

                    //i--; // this allows the chance of a spawner to be placed in the same room as a door
                }
                else if (remainingSpawners > 0)
                {
                    var spawner = new Spawner.BasicEnemy(this, randomX, randomY, 500,'spawner');
                    //this.spawner1.sprite.physicsBodyType = Phaser.Physics.ARCADE;
                    //this.spawner1.sprite.enableBody = true;
                    this.physics.enable(spawner.sprite, Phaser.Physics.ARCADE);

                    gameThat.spawners.push(spawner);

                    spawner.forEach(function (enemy) {
                        gameThat.enemyGroup.push(enemy);
                    }, this);
                    remainingSpawners--;
                    console.log("Spawner in room " + i + " at: " + randomX + "," + randomY);
                }
                else
                {
                    break;
                }
            }
        }

        

        if (this.currentLevel.type === "0")
        {
            startX = this.currentLevel.startX;
            startY = this.currentLevel.startY;
            this.player = new Player(this, startX, startY, 'player');
        }


        this.nextLevelButton = this.input.keyboard.addKey(Phaser.Keyboard.N);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.pickups = this.add.group();

        this.pickups.enableBody = true;
        this.pickups.physicsBodyType = Phaser.Physics.ARCADE;



        // var p = this.pickups.create(100, 100, 'pointsPickup');
        // p.amount = 3000;
        // p.name = p.key;

        // this.spawners = [];
        // this.spawner1 = new Spawner.BasicEnemy(this, 200, 200, 500,'spawner');
        // this.pickups.physicsBodyType = Phaser.Physics.ARCADE;
        // //this.spawner1.sprite.physicsBodyType = Phaser.Physics.ARCADE;
        // //this.spawner1.sprite.enableBody = true;
        // this.physics.enable(this.spawner1.sprite, 
        //     Phaser.Physics.ARCADE, true);

        // this.spawners.push(this.spawner1);

        // this.spawner1.forEach(function (enemy) {
        //     this.enemyGroup.push(enemy);
        // }, this);

        this.music = this.add.audio(Phaser.ArrayUtils.getRandomItem(this.currentLevel.music), 0.5, true);
        this.music.play();


    },

    loadPremadeLevel: function (tileWidth, tileHeight, fileName, tileset) {
        this.map = this.add.tilemap(fileName);

        this.map.addTilesetImage(tileset, tileset, tileWidth, tileHeight);

        //this.setMapCollision();

        this.layer = this.map.createLayer(0);

        //this.map.setCollisionBetween(2, 2, true);

        

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

    spawnPickup: function(x , y) {
        var pick = this.game.rnd.integerInRange(1, 6);

        if(pick == 1)
        {
            var p = this.pickups.create(x, y, 'healPickup');
            p.amount = 50;
            p.name = p.key;
        }

        else if(pick == 2)
        {
            var p = this.pickups.create(x, y, 'basicWeapon');
            p.amount = 50;
            p.name = p.key;
        }

        else if(pick == 3)
        {
            var p = this.pickups.create(x, y, 'supportWeapon');
            p.amount = 50;
            p.name = p.key;
        }

        else if(pick == 4)
        {
            var p = this.pickups.create(x, y, 'alternateBasicWeapon');
            p.amount = 50;
            p.name = p.key;
        }

        else if(pick == 5)
        {
            var p = this.pickups.create(x, y, 'ultimateWeapon');
            p.amount = 50;
            p.name = p.key;
        }

        else if(pick == 6)
        {
            var p = this.pickups.create(x, y, 'pointsPickup');
            p.amount = 1500;
            p.name = p.key;
        }
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
        if(bullet.destroyAtHit)
            bullet.kill();
        spawner.damage(bullet.hitDamage);
    },

    dealDmgToEnemy: function (enemy, bullet)
    {
        if(bullet.destroyAtHit)
            bullet.kill();


        if(enemy.invincible)
        return;

        if(bullet.damageOverTime > 0)
        {
            enemy.dealDot(bullet.damageOverTime, 
                Phaser.Timer.SECOND * 2);

            enemy.tint = 0x009900;
            enemy.damageOverTimeStacks++;
            enemy.damageOverTime = bullet.damageOverTime;
            this.time.events.repeat(Phaser.Timer.SECOND / 2, 
                4, enemy.dealDot, enemy);
            var timer = this.time.create(false);
            timer.add(Phaser.Timer.SECOND * 2, 
                enemy.removeDot, enemy);
            timer.start();
        }

        if(bullet.stunTime > 0)
        {
            enemy.stunStacks++;
            enemy.tint = 0x996633;
			enemy.body.moves = false;
			enemy.animations.play('idle');
            var timer = this.time.create(false);
            timer.add(Phaser.Timer.SECOND * 1, 
                enemy.removeStun, enemy);
            timer.start();
        }

        if(bullet.weaknessAmount > 0)
        {
            enemy.weaknessStacks++;
            enemy.tint = 0xCC0099;
            var timer = this.time.create(false);
            timer.add(Phaser.Timer.SECOND * 4, 
                enemy.removeWeak, enemy);
            timer.start();
        }

        enemy.dealDamage(bullet.hitDamage);

        if(!enemy.alive)
        {
            enemy.targetPlayer.addScore(enemy.scorePoints);
        }
    },

    goToNextLevel: function () {
        if(this.startedFading == 0)
        {
            this.startedFading = this.time.now;
            this.fadeOut();
            return;
        }
        ArcaneArcade.currentLevel++;
        this.music.stop();
        this.state.start('Game');
    },

    fadeOut: function() {
        this.player.sprite.body.moves = false;
        this.player.stunned = true;
        var sprite = this.add.sprite(this.camera.position.x , 
            this.camera.position.y, 'blackScreen');
        sprite.anchor.setTo(0.5, 0.5);
        sprite.alpha = 0;
        this.add.tween(sprite).to( { alpha: 1 }, 2000, "Linear", true);
        var timer = this.time.create(false);
            timer.add(Phaser.Timer.SECOND * 2, 
                this.goToNextLevel, this);
            timer.start();
    },

    endGame: function () {
        this.music.stop();
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        //  
        this.music.stop();

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
