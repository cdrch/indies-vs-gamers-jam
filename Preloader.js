
BasicGame.Preloader = function (game) {

	//this.background = null;
	//this.preloadBar = null;

	//this.ready = false;

};

BasicGame.Preloader.prototype = {

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

		//this.load.image('logo', 'phaser.png');
		this.load.image('textBG', 'Test Text Box Background.png');

		//this.load.image('player', 'test-player.png');

		this.load.image('BasicEnemy', 'enemy.jpg');
		this.load.image('spawner', 'spawner.png');
		this.load.image('crosshair', 'art/reticle2.png');
		this.load.image('bullet', 'ice-bolt.png');

		this.load.image('tileset16', 'greentest.png');
		this.load.image('tileset32', 'test-tileset32.png');
		this.load.image('tileset64', 'bluetestwalls.png');
		this.load.image('orangetest', 'orangetest.png');

		this.load.json('gameInfo', 'GameInfo.json');

		this.load.tilemap('test-map1', 'tilemaps/test-map1.json', null, Phaser.Tilemap.TILED_JSON);

		this.load.image('pointsPickup', 'pointsPickup.png');

		this.load.spritesheet('player', 'art/bubbles.png', 64, 64);

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		//this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		//if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		//{
			//this.ready = true;
			this.state.start('MainMenu');
		//}

	}

};
