
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
		// item format: {text: "", fn: function: {}, style: {standard text style object - optional}}
		var yPos = this.y;
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
};