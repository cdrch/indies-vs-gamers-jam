
BasicGame.MainMenu = function (game) {

	//this.music = null;
	//this.playButton = null;

};

var that; // this is a dirty hack, used to maintain proper context when dealing with stuff like passing functions to other functions and then referring to functions in the function that created the first function
// ...you can see how it works below

BasicGame.MainMenu.prototype = {

	create: function () {
		that = this;

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.music = this.add.audio('titleMusic');
		//this.music.play();

		//this.add.sprite(0, 0, 'titlepage');

		//this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');

		this.mainMenu = new Menu(this, false, true, this.world.centerX, 100, 50, true);
		this.mainMenu.addMenuItems([{text: "Play", fn: that.startGame}, {text: "Options", fn: this.startGame}, {text: "High Scores", fn: this.startGame}], { font: "65px Arial", fill: "#ff0044", align: "center" });

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		that.state.start('Game');

	},

	showOptions: function () {
		// show the options menu
	},

	showHighScores: function () {
		// show the high scores and player stats
	}

};
