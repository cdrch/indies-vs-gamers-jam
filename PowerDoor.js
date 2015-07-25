var PowerDoor = function(game, key, x, y, power)
{
	Door.call(this, game, key, x, y);

	this.power = power;

	if(power == 1)
	{
		this.sprite.tint = 0xCC0099;
	}

	else if (power == 2)
	{
		this.sprite.tint = 0x996633;
	}

	else if (power == 3)
	{
		this.sprite.tint = 0x0033CC;
	}

	else if (power == 4)
	{
		this.sprite.tint = 0x009900;
	}

	else if (power == 5)
	{
		this.sprite.tint = 0xFF0000;
	}

	else if (power == 6)
	{
		this.sprite.tint = 0x66FFCC;
	}
};

PowerDoor.prototype = Object.create(Door.prototype);
PowerDoor.prototype.constructor = PowerDoor;

PowerDoor.prototype.openDoor = function() {

	ArcaneArcade.playerWeapons[this.power] = true;
	this.currentGame.goToNextLevel();
};