var Pickup = function(game, posX, posY, name, amount) {

	if(name == "multiplier")
	{
		this.sprite = game.add.sprite(posX, posY, "multiplierPickup");
	}

	else if(name == "heal")
	{
		this.sprite = game.add.sprite(posX, posY, "healPickup");
	}

	else if(name == "damage")
	{
		this.sprite = game.add.sprite(posX, posY, "damagePickup");
	}

	else if(name == "weapons")
	{
		this.sprite = game.add.sprite(posX, posY, "weaponsPickup");
	}

	else if(name == "points")
	{
		this.sprite = game.add.sprite(posX, posY, "pointsPickup");
	}

	this.sprite.anchor.set(0.5);

	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

	this.name = name;
	this.amount = amount;
};

Pickup.prototype.onCollect = function(player){

	//play sound on collect

	if(this.name == "multiplier")
	{
		//give player a score multiplier
	}

	if(this.name == "heal")
	{
		//heals player 
	}

	if(this.name == "damage")
	{
		//give bonus damage
	}

	if(this.name == "weapons")
	{
		//upgrade weapons
	}

	if(this.name == "points")
	{
		//give additional points
	}

	this.sprite.kill;
};