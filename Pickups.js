var Pickup = function(game, posX, posY, name, amount) {


	else if(name == "healPickup")
	{
		this.sprite = game.add.sprite(posX, posY, "healPickup");
	}

	else if(name == "basicWeapon")
	{
		this.sprite = game.add.sprite(posX, posY, "basicWeapon");
	}

	else if(name == "supportWeapon")
	{
		this.sprite = game.add.sprite(posX, posY, "supportWeapon");
	}


	else if(name == "alternateBasicWeapon")
	{
		this.sprite = game.add.sprite(posX, posY, "alternateBasicWeapon");
	}


	else if(name == "ultimateWeapon")
	{
		this.sprite = game.add.sprite(posX, posY, "ultimateWeapon");
	}


	else if(name == "pointsPickup")
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