var TextBox = function (game, text, background, interactionKey, x, y, padding, centerBox, centerText, style)
{
	this.bg = game.add.image(x, y, background);
	if (centerBox && centerText)
	{
		this.bg.anchor.set(0.5);
		this.text = game.add.text(this.bg.x, this.bg.y, text, style);
		this.text.anchor.set(0.5);
	}
	else if (centerBox)
	{
		this.bg.anchor.set(0.5);
		this.text = game.add.text(this.bg.x - this.bg.width * 0.5, this.bg.y - this.bg.height * 0.5, text, style);
	}
	else if (centerText)
	{
		this.text = game.add.text(this.bg.x + (this.bg.width * 0.5), this.bg.y + (this.bg.height * 0.5), text, style);
		this.text.anchor.set(0.5);
	}
	else
	{
		this.text = game.add.text(this.bg.x, this.bg.y, text, style);
	}
	this.text.wordWrap = true;
	this.text.wordWrapWidth = this.bg.width - padding;

	this.pages = [];
	this.pages[0] = text;

	if (this.text.height > this.bg.height)
	{
		var paragraph = this.text.text;
		paragraph = paragraph.split(" ");
		this.pages[0] = "";
		var pageCount = 1;
		var totalWords = paragraph.length;
		for (var i = 0; i < totalWords; i++)
		{
			var beforeWordAdded = this.pages[pageCount-1];
			var tempText = beforeWordAdded;
			var nextWord = paragraph.splice(0, 1);
			tempText = tempText.concat(nextWord + " ");
			//tempText.concat(" ");
			this.pages[pageCount-1] = tempText;
			//this.pages[pageCount-1].concat(" ");
			var tempString = this.pages[pageCount-1];
			this.text.setText(tempString);
			if (this.text.height > this.bg.height)
			{
				pageCount++;
				this.pages[pageCount-1] = nextWord + " ";

				this.pages[pageCount-2] = beforeWordAdded;
			}
		}
	}

	this.currentPage = 0;
	var str = this.pages[this.currentPage];
	this.text.setText(str);
	game.input.keyboard.addKey(interactionKey).onDown.add(this.nextPage, this);

	console.log(this.text.text);
};

TextBox.prototype.nextPage = function () {
	this.currentPage++;
	if (this.pages[this.currentPage] === undefined)
	{
		this.close();
	}
	else
	{
		this.text.setText(this.pages[this.currentPage]);
	}
};

TextBox.prototype.close = function () {
	this.text.destroy();
	this.bg.destroy();
};