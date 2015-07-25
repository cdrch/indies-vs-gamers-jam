
ArcaneArcade.Preloader = function (game) {

	//this.background = null;
	//this.preloadBar = null;

	this.ready = false;

};

ArcaneArcade.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		//this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		//this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		//this.load.image('titlepage', 'images/title.jpg');
		//this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
		//this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		//this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
		//	+ lots of other required assets here

		this.load.image('textBG', 'Test Text Box Background.png');

		this.load.spritesheet('BasicEnemy', 'art/skellColorSheet.png', 64, 64);
		this.load.spritesheet('spawner', 'art/spawnerSheet.png', 66, 56);
		this.load.image('crosshair', 'art/reticle2.png');
		this.load.image('bullet', 'ice-bolt.png');
		this.load.image('arrow', 'arrow.png');
		this.load.image('fireball', 'art/fireball.png');	

		this.load.image('door', 'art/door.png');
		this.load.image('blackScreen', 'art/black.png');

		this.load.image('basicWeapon', 'art/pickups/magicMissle.png');
		this.load.image('supportWeapon', 'art/pickups/weakness.png');
		this.load.image('alternateBasicWeapon', 'art/pickups/poison.png');
		this.load.image('ultimateWeapon', 'art/pickups/firebolt.png');
		this.load.image('healPickup', 'art/pickups/health.png');
		this.load.image('pointsPickup', 'art/pickups/points.png');

		this.load.image('tileset16', 'greentest.png');
		this.load.image('tileset32', 'test-tileset32.png');
		this.load.image('tileset64', 'bluetestwalls.png');
		this.load.image('orangetest', 'orangetest.png');

		this.load.image('simple-tiles', 'art/simple-tiles.png');

		this.load.json('gameInfo', 'GameInfo.json');

		this.load.tilemap('test-map1', 'tilemaps/test-map1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map1', 'tilemaps/map1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map2', 'tilemaps/map1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map3', 'tilemaps/map1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map4', 'tilemaps/map1.json', null, Phaser.Tilemap.TILED_JSON);

		this.load.image('pointsPickup', 'pointsPickup.png');

		this.load.spritesheet('player', 'art/bubbles.png', 64, 64);

		this.load.image('transparentBubble', 'art/Transparent Bubble.png');

		this.load.image('hp-bar', 'art/hp-bar.png');
		this.load.image('hp-bg', 'art/hp-bg.png');

		this.load.audio('titleSong', ['audio/music/Title Song Final.mp3', 'audio/music/Title Song Final.ogg']);
		this.load.audio('characterTheme', ['audio/music/Main Character Fixed.mp3', 'audio/music/Main Character Fixed.ogg']);
		this.load.audio('endOfGameSong', ['audio/music/End of Game.mp3', 'audio/music/End of Game.ogg']);
		this.load.audio('finalBossTheme', ['audio/music/Final Boss Battle.mp3', 'audio/music/Final Boss Battle.ogg']);
		this.load.audio('gameOverSong', ['audio/music/Game Over.mp3', 'audio/music/Game Over.ogg']);
		this.load.audio('ghostTheme', ['audio/music/Ghost.mp3', 'audio/music/Ghost.ogg']);
		this.load.audio('magicalGirlThemeOne', ['audio/music/Main Character is a Magical Girl.mp3', 'audio/music/Main Character is a Magical Girl.ogg']);
		this.load.audio('magicalGirlThemeTwo', ['audio/music/Main Character is a Magical Girl ver2.mp3', 'audio/music/Main Character is a Magical Girl ver2.ogg']);
		this.load.audio('sadThemeOne', ['audio/music/Main Character Sad 1.mp3', 'audio/music/Main Character Sad 1.ogg']);
		this.load.audio('sadThemeTwo', ['audio/music/Main Character Sad 2.mp3', 'audio/music/Main Character Sad 2.ogg']);

		this.load.audio('die', ['audio/sfx/Die.mp3', 'audio/sfx/Die.ogg']);
		this.load.audio('earth', ['audio/sfx/Earth.mp3', 'audio/sfx/Earth.ogg']);
		this.load.audio('enemyHit', ['audio/sfx/Enemy Hit.mp3', 'audio/sfx/Enemy Hit.ogg']);
		this.load.audio('exitLevel', ['audio/sfx/Exit Level.mp3', 'audio/sfx/Exit Level.ogg']);
		this.load.audio('fireball', ['audio/sfx/Fireball.mp3', 'audio/sfx/Fireball.ogg']);
		this.load.audio('getCoin', ['audio/sfx/GetCoin.mp3', 'audio/sfx/GetCoin.ogg']);
		this.load.audio('getHit', ['audio/sfx/GetHit.mp3', 'audio/sfx/GetHit.ogg']);
		this.load.audio('heal', ['audio/sfx/Heal.mp3', 'audio/sfx/Heal.ogg']);
		this.load.audio('ice', ['audio/sfx/Ice.mp3', 'audio/sfx/Ice.ogg']);
		this.load.audio('lightning', ['audio/sfx/Lightning.mp3', 'audio/sfx/Lightning.ogg']);
		this.load.audio('pickup', ['audio/sfx/Pickup.mp3', 'audio/sfx/Pickup.ogg']);
		this.load.audio('water', ['audio/sfx/Water.mp3', 'audio/sfx/Water.ogg']);
		this.load.audio('wind', ['audio/sfx/Wind.mp3', 'audio/sfx/Wind.ogg']);
		this.load.audio('skeletonBow', ['audio/sfx/Skeleton Bow.mp3', 'audio/sfx/Skeleton Bow.ogg']);
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		//this.preloadBar.cropEnabled = false;
		
		this.sound.setDecodedCallback([ 'titleSong', 'characterTheme', 'endOfGameSong', 'finalBossTheme', 'gameOverSong',
			 'ghostTheme', 'magicalGirlThemeOne', 'magicalGirlThemeTwo', 'sadThemeOne', 'sadThemeTwo',
			  'die', 'earth', 'enemyHit', 'heal', 'fireball',
			   'getCoin', 'getHit', 'exitLevel', 'ice', 'lightning',
			    'pickup', 'water', 'wind', 'skeletonBow' ], this.start, this);

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		// if (this.cache.isSoundDecoded('titleSong') && this.ready === false)
		// {
		// 	this.ready = true;
		// 	this.state.start('MainMenu');
		// }

	},

	start: function () {
		this.ready = true;
		this.state.start('MainMenu');
	}

};
