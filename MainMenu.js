
ArcaneArcade.MainMenu = function (game) {

	this.music = null;
	//this.playButton = null;

};

var that; // this is a dirty hack, used to maintain proper context when dealing with stuff like passing functions to other functions and then referring to functions in the function that created the first function
// ...you can see how it works below

ArcaneArcade.MainMenu.prototype = {

	create: function () {
		that = this;

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleSong', 1, true);
		this.music.play();

		//this.add.sprite(0, 0, 'titlepage');

		//this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');

		
		// this.optionsMenu = new Menu(this, false, true, this.world.centerX, 100, 50, true);
		// this.optionsMenu.addMenuItems([{text: "Music Volume: " + ArcaneArcade.musicVolume * 100 + "%", fn: this.changeMusicVolume}, {text: "Effects Volume: " + ArcaneArcade.sfxVolume * 100 + "%", fn: this.changeSFXVolume}, {text: "Back", fn: this.returnToMainMenu}]);
		// this.optionsMenu.hide();

		this.mainMenu = new Menu(this, false, true, this.world.centerX, 100, 50, true);
		// this.mainMenu.addMenuItems([{text: "Play", fn: that.startGame}, {text: "Options", fn: this.showOptions}, {text: "High Scores", fn: this.showHighScores}], { font: "65px Arial", fill: "#ff0044", align: "center" });
		this.mainMenu.addMenuItems([{text: "Play", fn: that.startGame}], { font: "65px Arial", fill: "#ff0044", align: "center" });

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		that.music.stop();

		Player.lives = 3;
		Player.score = 0;

		//	And start the actual game
		that.state.start('Game');

	},

	showOptions: function () {
		that.mainMenu.hide();
		that.optionsMenu.show();
	},

	returnToMainMenu: function () {
		that.optionsMenu.hide();
		that.mainMenu.show();
	},

	changeMusicVolume: function () {

	},

	changeSFXVolume: function () {

	},

	showHighScores: function () {
		// show the high scores and player stats
	}

};
