var TextBox = function (game, text, background, x, y, padding, style)
{
	this.bg = game.add.image(x, y, background);
	//this.bg.anchor.set(0.5);
	this.text = game.add.text(x, y, text, style);
	//this.text.anchor.set(0.5);
	this.text.wordWrap = true;
	this.text.wordWrapWidth = this.bg.width - padding;
};