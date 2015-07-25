
ArcaneArcade.Preloader = function (game) {

	//this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

ArcaneArcade.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(256, 384, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		//this.load.image('titlepage', 'images/title.jpg');
		//this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
		//this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		//this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
		//	+ lots of other required assets here

		this.load.image('textBG', 'Test Text Box Background.png');

		this.load.spritesheet('BasicEnemy', 'skellColorSheet.png', 64, 64);
		this.load.spritesheet('spawner', 'spawnerSheet.png', 66, 56);
		this.load.spritesheet('Ghost', 'Boss_Sheet.png', 128, 128);
		this.load.image('crosshair', 'reticle2.png');
		this.load.image('bullet', 'ice-bolt.png');
		this.load.image('magicMissile', 'Magic Missile.png');
		this.load.image('arrow', 'arrow.png');
		this.load.image('fireball', 'fireball.png');	

		this.load.image('door', 'door.png');
		this.load.image('blackScreen', 'black.png');

		this.load.image('basicWeapon', 'magicMissle.png');
		this.load.image('supportWeapon', 'weakness.png');
		this.load.image('alternateBasicWeapon', 'poison.png');
		this.load.image('ultimateWeapon', 'firebolt.png');
		this.load.image('healPickup', 'health.png');
		this.load.image('pointsPickup', 'points.png');

		this.load.image('tileset16', 'greentest.png');
		this.load.image('tileset32', 'test-tileset32.png');
		this.load.image('tileset64', 'bluetestwalls.png');
		this.load.image('orangetest', 'orangetest.png');

		this.load.image('simple-tiles', 'simple-tiles.png');

		this.load.json('gameInfo', 'GameInfo.json');

		this.load.tilemap('test-map1', 'test-map1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map1', 'map1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map2', 'map1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map3', 'map1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('map4', 'map1.json', null, Phaser.Tilemap.TILED_JSON);

		this.load.image('pointsPickup', 'pointsPickup.png');

		this.load.spritesheet('player', 'bubbles.png', 64, 64);

		this.load.image('transparentBubble', 'Transparent Bubble.png');

		this.load.image('hp-bar', 'hp-bar.png');
		this.load.image('hp-bg', 'hp-bg.png');

		this.load.audio('titleSong', ['Title Song Final.mp3', 'Title Song Final.ogg']);
		this.load.audio('characterTheme', ['Main Character Fixed.mp3', 'Main Character Fixed.ogg']);
		this.load.audio('endOfGameSong', ['End of Game.mp3', 'End of Game.ogg']);
		this.load.audio('finalBossTheme', ['Final Boss Battle.mp3', 'Final Boss Battle.ogg']);
		this.load.audio('gameOverSong', ['Game Over.MP3', 'Game Over.OGG']);
		this.load.audio('ghostTheme', ['Ghost.mp3', 'Ghost.ogg']);
		this.load.audio('magicalGirlThemeOne', ['Main Character is a Magical Girl.mp3', 'Main Character is a Magical Girl.ogg']);
		this.load.audio('magicalGirlThemeTwo', ['Main Character is a Magical Girl ver2.mp3', 'Main Character is a Magical Girl ver2.ogg']);
		this.load.audio('sadThemeOne', ['Main Character Sad 1.mp3', 'Main Character Sad 1.ogg']);
		this.load.audio('sadThemeTwo', ['Main Character Sad 2.mp3', 'Main Character Sad 2.ogg']);

		this.load.audio('die', ['Die.mp3', 'Die.ogg']);
		this.load.audio('earth', ['Earth.mp3', 'Earth.ogg']);
		this.load.audio('enemyHit', ['Enemy Hit.mp3', 'Enemy Hit.ogg']);
		this.load.audio('exitLevel', ['Exit Level.mp3', 'Exit Level.ogg']);
		this.load.audio('fireball', ['Fireball.mp3', 'Fireball.ogg']);
		this.load.audio('getCoin', ['GetCoin.mp3', 'GetCoin.ogg']);
		this.load.audio('getHit', ['GetHit.mp3', 'GetHit.ogg']);
		this.load.audio('heal', ['Heal.mp3', 'Heal.ogg']);
		this.load.audio('ice', ['Ice.mp3', 'Ice.ogg']);
		this.load.audio('lightning', ['Lightning.mp3', 'Lightning.ogg']);
		this.load.audio('pickup', ['Pickup.mp3', 'Pickup.ogg']);
		this.load.audio('water', ['Water.mp3', 'Water.ogg']);
		this.load.audio('wind', ['Wind.mp3', 'Wind.ogg']);
		this.load.audio('skeletonBow', ['Skeleton Bow.mp3', 'Skeleton Bow.ogg']);
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
		
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
