
var Menu = function (game, imageBased, vertical, x, y, spacing, centered)
{
	this.game = game;
	this.imageBased = imageBased; // whether buttons with images or clickable text is generated
	this.vertical = vertical; // whether the menu is vertically or horizontally aligned
	this.x = x;
	this.y = y;
	this.spacing = spacing; // spacing between items
	this.centered = centered;

	this.menuItemsGroup = game.add.group();
};

Menu.prototype = {

	addMenuItems: function (items, style) { // style is optional - it can still be overridden by each individual item
		// item format: {text: "", fn: function: {}, style: {standard text style object - optional}, button: image}
		var yPos = this.y;
		if (this.imageBased) // if the buttons are images
		{
			for (var i = 0, l = items.length; i < l; i++)
			{
				var item = items[i];

				var button = this.game.add.button(this.x, yPos, item.button, item.fn, this.game, 2, 1, 0);
				if (this.centered)
					button.anchor.set(0.5);

				yPos += button.height + this.spacing;
			}
		}
		else // if the buttons are pure text
		{
			for (var i = 0, l = items.length; i < l; i++)
			{
				var item = items[i];

				var button = this.game.add.text(this.x, yPos, item.text, (item.style === undefined) ? style : item.style);
				if (this.centered)
					button.anchor.set(0.5);

				button.inputEnabled = true;
				button.events.onInputDown.add(item.fn, this);

				yPos += button.height + this.spacing;
			}
		}		
	}
};