var that2;
var Weapon = {};

/*MAGIC MISSILE*/

Weapon.MagicMissile = function (game) {

    Phaser.Group.call(this, game, game.world, 'Magic Missile', 
        false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 200;
    this.hitDamage = 5;

    this.level = 1;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet'), true, true);
    }

    this.setAll("hitDamage", this.hitDamage);   

    return this;

};


Weapon.MagicMissile.prototype = Object.create(Phaser.Group.prototype);
Weapon.MagicMissile.prototype.constructor = Weapon.MagicMissile;

Weapon.MagicMissile.prototype.levelUp = function() {

    this.level++;

    if(this.level == 2)
        this.fireRate /= 2;
    else if (this.level == 3)
    {
        this.hitDamage *= 2;
        this.setAll("hitDamage", this.hitDamage);
    }
};

Weapon.MagicMissile.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) { return; }


    this.nextFire = this.game.time.time + this.fireRate;

    var x = source.sprite.x + 10;
    var y = source.sprite.y + 10;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 
        source.playerTarget.x, source.playerTarget.y);


};

/*ICE BOLT*/


Weapon.IceBolt = function (game) {

    Phaser.Group.call(this, game, game.world, 'Ice Bolt', 
        false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 500;
    this.hitDamage = 10;
    this.numberOfBullets = 8;

    this.level = 1;
    
    for (var i = 0; i < 250; i++)
    {
        this.add(new Bullet(game, 'bullet'), true, true);
    }

    this.setAll("hitDamage", this.hitDamage);

    return this;

};


Weapon.IceBolt.prototype = Object.create(Phaser.Group.prototype);
Weapon.IceBolt.prototype.constructor = Weapon.IceBolt;

Weapon.IceBolt.prototype.levelUp = function() {

    this.level++;

    if(this.level == 2)
        this.numberOfBullets = 16;
    else if (this.level == 3)
        this.numberOfBullets = 32;
};

Weapon.IceBolt.prototype.fire = function (source) {


    if (this.game.time.time < this.nextFire || 
        this.countDead < this.numberOfBullets) 
            { return; }


    this.nextFire = this.game.time.time + this.fireRate;

    for(var i = 0; i < this.numberOfBullets; i++)
    {
        this.getFirstExists(false).fireCircle(source.sprite.x,
         source.sprite.y, 360 / this.numberOfBullets * i,
         this.bulletSpeed, 0, 0, this.hitDamage);
    }

};

/*POISON STING*/

Weapon.PoisonSting = function (game) {

    Phaser.Group.call(this, game, game.world, 'Poison Sting', 
        false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 150;
    this.fireRate = 1200;
    this.hitDamage = 0;
    this.damageOverTime = 30;

    this.level = 1;

    for (var i = 0; i < 30; i++)
    {
        this.add(new Bullet(game, 'bullet'), true, true);
    }

    this.setAll("hitDamage", this.hitDamage);
    this.setAll("damageOverTime", this.damageOverTime);

    return this;

};


Weapon.PoisonSting.prototype = Object.create(Phaser.Group.prototype);
Weapon.PoisonSting.prototype.constructor = Weapon.PoisonSting;

Weapon.PoisonSting.prototype.levelUp = function() {

    this.level++;

    if(this.level == 2)
    {
        this.damageOverTime *= 2;
        this.setAll("damageOverTime", this.damageOverTime);
    }
    else if (this.level == 3)
    {
        this.setAll("destroyAtHit", false);
    }
};

Weapon.PoisonSting.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) { return; }


    this.nextFire = this.game.time.time + this.fireRate;

    var x = source.sprite.x + 10;
    var y = source.sprite.y + 10;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 
        source.playerTarget.x, source.playerTarget.y);


};

/*WIND*/

//TO ADD KNOCKBACK LATER!

Weapon.Wind = function (game) {

    Phaser.Group.call(this, game, game.world, 'Wind', 
        false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 500;
    this.hitDamage = 0;
    this.numberOfBullets = 1;
    this.stunTime = 1;

    this.level = 1;
    
    for (var i = 0; i < 250; i++)
    {
        this.add(new Bullet(game, 'bullet'), true, true);
    }

    this.setAll("hitDamage", this.hitDamage);
    this.setAll("stunTime", this.stunTime);

    this.levelUp();
    this.levelUp();

    return this;

};


Weapon.Wind.prototype = Object.create(Phaser.Group.prototype);
Weapon.Wind.prototype.constructor = Weapon.Wind;

Weapon.Wind.prototype.levelUp = function() {

    this.level++;

    if(this.level == 2)
        this.numberOfBullets = 8;
    else if (this.level == 3)
        this.numberOfBullets = 16;
};

Weapon.Wind.prototype.fire = function (source) {


    if (this.game.time.time < this.nextFire || 
        this.countDead < this.numberOfBullets) 
            { return; }


    this.nextFire = this.game.time.time + this.fireRate;

    var x = source.sprite.x + 10;
    var y = source.sprite.y + 10;

    if(this.numberOfBullets == 1)
    {
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 
        source.playerTarget.x, source.playerTarget.y);
    }
    else
    {
        for(var i = 0; i < this.numberOfBullets; i++)
        {
            this.getFirstExists(false).fireCircle(source.sprite.x,
             source.sprite.y, 360 / this.numberOfBullets * i,
             this.bulletSpeed, 0, 0, this.hitDamage);
        }
    }
};

/*WEAKNESS*/

Weapon.Weakness = function (game) {

    Phaser.Group.call(this, game, game.world, 'Weakness', 
        false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 1500;
    this.hitDamage = 0;
    this.weaknessAmount = 0.15;

    this.level = 1;

    for (var i = 0; i < 10; i++)
    {
        this.add(new Bullet(game, 'bullet'), true, true);
    }

    this.setAll("hitDamage", this.hitDamage);
    this.setAll("weaknessAmount", this.weaknessAmount);

    return this;

};


Weapon.Weakness.prototype = Object.create(Phaser.Group.prototype);
Weapon.Weakness.prototype.constructor = Weapon.Weakness;

Weapon.Weakness.prototype.levelUp = function() {

    this.level++;

    if(this.level == 2)
    {
        this.weaknessAmount = 0.3;
        this.setAll("weaknessAmount", this.weaknessAmount);
    }
    else if (this.level == 3)
    {
        this.weaknessAmount = 0.5;
        this.setAll("weaknessAmount", this.weaknessAmount);
    }
};

Weapon.Weakness.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) { return; }


    this.nextFire = this.game.time.time + this.fireRate;

    var x = source.sprite.x + 10;
    var y = source.sprite.y + 10;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 
        source.playerTarget.x, source.playerTarget.y);


};

/*FIREBALL*/

Weapon.Fireball = function (game) {

    Phaser.Group.call(this, game, game.world, 'Magic Missile', 
        false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 200;
    this.fireRate = 20000;
    this.hitDamage = 10;

    this.level = 1;

    for (var i = 0; i < 2; i++)
    {
        this.add(new Bullet(game, 'bullet'), true, true);
    }

    this.setAll("hitDamage", this.hitDamage);   
    this.setAll("destroyAtHit", false);
    this.setAll("scale.x", 0.5);
    this.setAll("scale.y", 0.5);

    return this;

};


Weapon.Fireball.prototype = Object.create(Phaser.Group.prototype);
Weapon.Fireball.prototype.constructor = Weapon.Fireball;

Weapon.Fireball.prototype.levelUp = function() {

    this.level++;

    if(this.level == 2)
    {
        this.setAll("scale.x", 1);
        this.setAll("scale.y", 1);
    }
    else if (this.level == 3)
    {
        this.hitDamage *= 2;
        this.setAll("hitDamage", this.hitDamage);
    }
};

Weapon.Fireball.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) { return; }


    this.nextFire = this.game.time.time + this.fireRate;

    var x = source.sprite.x + 10;
    var y = source.sprite.y + 10;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 
        source.playerTarget.x, source.playerTarget.y);


};

/*BUBBLES BEAM*/

Weapon.BubblesBeam = function (game) {

    Phaser.Group.call(this, game, game.world, 'Bubbles Beam', 
        false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = 30;
    this.cooldown = 20000;
    this.hitDamage = 15;
    this.cooldownEnd =0;

    this.firstClick = 0;
    this.clickLength = 750;
    this.endClick = 0;

    this.level = 1;

    for (var i = 0; i < 400; i++)
    {
        this.add(new Bullet(game, 'transparentBubble'), true, true);
    }

    this.setAll("hitDamage", this.hitDamage);   
    this.setAll("scale.x", 0.3);
    this.setAll("scale.y", 0.3);

    return this;

};


Weapon.BubblesBeam.prototype = Object.create(Phaser.Group.prototype);
Weapon.BubblesBeam.prototype.constructor = Weapon.BubblesBeam;

Weapon.BubblesBeam.prototype.levelUp = function() {

    this.level++;

    if(this.level == 2)
    {
        this.hitDamage *= 2;
        this.setAll("hitDamage", this.hitDamage);
    }
    else if (this.level == 3)
    {
        this.hitDamage *= 1.5;
        this.setAll("hitDamage", this.hitDamage);
    }
};

Weapon.BubblesBeam.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire || 
        this.game.time.time < this.cooldownEnd) { return; }

    if(this.firstClick == 0)
    {
        this.firstClick = this.game.time.time;
        this.endClick = this.game.time.time + this.clickLength;
        this.fireRate = 30;
    }

    if(this.endClick < this.game.time.time)
    {
        this.cooldownEnd = this.game.time.time + this.cooldown;
        this.firstClick = 0;
    }

    var bubblesNow = this.game.rnd.integerInRange(3, 12);


    this.nextFire = this.game.time.time + this.fireRate;

    for(var i = 0; i< bubblesNow; i++)
    {

        var x = source.sprite.x + this.game.rnd.integerInRange(-10, 10);
        var y = source.sprite.y + this.game.rnd.integerInRange(-10, 10);

        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 
            source.playerTarget.x, source.playerTarget.y);
    }

};


/*WEAPONS END*/

var Player = function(game, posX, posY, imageName) {    

	this.sprite = game.add.sprite(posX, posY, imageName);
	this.sprite.anchor.set(0.5);

    this.initialx = posX;
    this.initialy = posY;

    this.stunned = false;

    this.sprite.health = 100;
    // animations
    
    this.sprite.animations.add('idle', [0], 15, false);
    this.sprite.animations.add('run', [0, 1, 2, 3], 25, true);
    this.facing = 'right';
    this.running = false;

    this.sprite.animations.play('idle');

	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.MAXSPEED = 300; // player's maximum velocity

    this.sprite.body.collideWorldBounds = true;


    this.playerTarget = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'crosshair');
    this.playerTarget.anchor.set(0.5);

    this.setControls(game);

    game.camera.follow(this.sprite);



    this.weapons = [];
    this.currentWeapon = 0;
    this.weaponName = null;


    this.weapons.push(new Weapon.MagicMissile(game));
    this.weapons.push(new Weapon.IceBolt(game));
    this.weapons.push(new Weapon.PoisonSting(game));
    this.weapons.push(new Weapon.Wind(game));
    this.weapons.push(new Weapon.Weakness(game));
    this.weapons.push(new Weapon.Fireball(game));
    this.weapons.push(new Weapon.BubblesBeam(game));

    
    
    for (var i = 1; i < this.weapons.length; i++)
    {
        this.weapons[i].visible = false;
        this.weapons[i].enableBody = true;
        this.weapons[i].physicsBodyType = Phaser.Physics.ARCADE;
    }

    var changeKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    changeKey.onDown.add(this.nextWeapon, this);

    this.bubble = game.add.sprite(this.sprite.x, this.sprite.y, 'transparentBubble');
    this.bubble.anchor.set(0.5);
    game.physics.enable(this.bubble, Phaser.Physics.ARCADE);
    this.bubble.exists = false;

    this.hpBG = game.add.sprite(20, 60, 'hp-bg');
    this.hpBG.anchor.setTo(0, 0.5);
    this.hpBG.fixedToCamera = true;
    
    this.hpBar = game.add.sprite(28, 60, 'hp-bar');
    this.hpBar.anchor.setTo(0, 0.5);
    this.hpBar.fixedToCamera = true;

    this.hpBar.cropEnabled = true;
    this.hpBar.originalWidth = this.hpBar.width;
    this.hpBar.crop(new Phaser.Rectangle(0, 0, (this.sprite.health / 100) * this.hpBar.width, this.hpBar.height), true);

    this.hpText = game.add.text(
        32, 60, 
        '' + this.sprite.health + '%', 
        { font: '20px monospace', fill: '#111', align: 'center' }
    );
    this.hpText.anchor.setTo(0, 0.4);
    this.hpText.fixedToCamera = true;

    this.weaponName = game.add.text(
    game.camera.position.x + 400, game.camera.position.y - game.camera.height / 2 + 60, 
    '' + this.weapons[this.currentWeapon].name, 
    { font: '20px monospace', fill: '#fff', align: 'right' });

    this.weaponName.anchor.setTo(1, 0.5);
    this.weaponName.fixedToCamera = true;


    this.multiplier = 1;
    this.score = 0;
    this.lives = 3;

    this.scoreText = game.add.text(
    game.camera.position.x, game.camera.position.y - game.camera.height / 2 + 30, 
    '' + this.score, 
    { font: '20px monospace', fill: '#fff', align: 'center' });
    this.livesText = game.add.text(
    game.camera.position.x, game.camera.position.y - game.camera.height / 2 + 70, 
    '' + this.lives + ' ' + ((this.lives === 1) ? ' Life' : 'Lives') + ' Left', 
    { font: '20px monospace', fill: '#fff', align: 'center' });

    this.scoreText.anchor.setTo(0.5, 0.5);
    this.scoreText.fixedToCamera = true;

    this.livesText.anchor.setTo(0.5, 0.5);
    this.livesText.fixedToCamera = true;



};

Player.prototype.addScore = function(points) {
    this.score += points * this.multiplier;
    this.scoreText.text = this.score;

};

Player.prototype.nextWeapon = function () {
            //  Tidy-up the current weapon
            /*if (this.currentWeapon > 9)
            {
                this.weapons[this.currentWeapon].reset();
            }
            else
            {
                this.weapons[this.currentWeapon].visible = false;
                this.weapons[this.currentWeapon].callAll('reset', null, 0, 0);
                this.weapons[this.currentWeapon].setAll('exists', false);
            }*/
            //  Activate the new one
            do
            {
                this.currentWeapon++;
                if (this.currentWeapon === this.weapons.length)
                {
                    this.currentWeapon = 0;
                }
            }while(!ArcaneArcade.playerWeapons[this.currentWeapon]);

            this.weapons[this.currentWeapon].visible = true;
            this.weaponName.text = this.weapons[this.currentWeapon].name;
        };

Player.prototype.setControls = function(game) {
	this.leftControl = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.upControl = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.rightControl = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.downControl = game.input.keyboard.addKey(Phaser.Keyboard.S);
};

Player.prototype.movePlayer = function(game) {
    
    var xInput = 0;
    var yInput = 0;

    if (this.leftControl.isDown)
    {
        xInput = -1;
    }
    else if (this.rightControl.isDown)
    {
        xInput = 1;
    }

    if (this.upControl.isDown)
    {
        yInput = -1;
    }
    else if (this.downControl.isDown)
    {
        yInput = 1;
    }

    var magnitude = Math.sqrt((xInput * xInput) + (yInput * yInput));

    if (magnitude !== 0)
    {
        xInput = xInput / magnitude;
        yInput = yInput / magnitude;
    }    

    this.sprite.body.velocity.x = xInput * this.MAXSPEED;
    this.sprite.body.velocity.y = yInput * this.MAXSPEED;

    var temp = (magnitude !== 0);

    if ( magnitude !== 0 && !this.running)
    {
        this.sprite.animations.play('run');
        this.running = true;
    }
    else if (magnitude === 0 && this.running)
    {
        this.sprite.animations.play('idle');
        this.running = false;
    }

    if (this.playerTarget.x < this.sprite.x 
        && this.facing == 'right')
    {
        this.facing = 'left';
    }
    else if (this.playerTarget.x > this.sprite.x  
        && this.facing == 'left')
    {
        this.facing = 'right';
    }

    if (this.facing == 'left')
        this.sprite.scale.set(-1, 1);
    else
        this.sprite.scale.set(1, 1);
};

Player.prototype.playerShoot = function(game) {

    if(game.input.activePointer.isDown)
    {
    	//handle the bullet creation and firing
    	this.weapons[this.currentWeapon].fire(this);
   }
};

Player.prototype.updatePlayerTarget = function(game) {
    if (this.sprite.alive)
    {
        this.playerTarget.x = game.camera.x + game.input.mousePointer.x;
        this.playerTarget.y = game.camera.y + game.input.mousePointer.y;
    }
	else
    {
        this.playerTarget.x = game.camera.x - 96;
        this.playerTarget.y = game.camera.y - 96;
    }

};

Player.prototype.updateScorePosition = function(game) {

    this.scoreText.position = game.camera.position;
    this.scoreText.position.y -= game.camera.height / 2 - 30;
};

Player.prototype.collectPickup = function(player, pickup)
{
    if(pickup.name == "multiplierPickup")
    {
        //give player a score multiplier
    }

    if(pickup.name == "healPickup")
    {
        this.player.sprite.health += amount;
        //heals player 
    }


    if(pickup.name == "basicWeapon")
    {
        //upgrade weapons
        this.weapons[0].levelUp();
    }

    if(pickup.name == "supportWeapon")
    {
        //upgrade weapons
        this.weapons[1].levelUp();
        this.weapons[2].levelUp();
    }

    if(pickup.name == "alternateBasicWeapon")
    {
        //upgrade weapons
        this.weapons[3].levelUp();
        this.weapons[4].levelUp();
    }

    if(pickup.name == "ultimateWeapon")
    {
        //upgrade weapons
        this.weapons[5].levelUp();
        this.weapons[6].levelUp();
    }

    if(pickup.name == "pointsPickup")
    {
        this.player.addScore(pickup.amount);
        //give additional points
    }

    pickup.kill();
};


Player.prototype.getHit = function(player, bullet)
{
    player.damage(bullet.hitDamage);
    bullet.kill();
};

Player.prototype.update = function(game) {
    //this.updateScorePosition(game);
    this.hpText.text = this.sprite.health + '%';
    this.hpBar.crop(new Phaser.Rectangle(0, 0, (this.sprite.health / 100) * this.hpBar.originalWidth, this.hpBar.height), true);
    this.hpBar.updateCrop();

    if(this.stunned) return;
    if(this.sprite.alive)
    {
        this.movePlayer(game);
        this.playerShoot(game);
    }
    else
    {
        if (!this.bubble.exists)
        {
            this.respawn(game);            
        }    
        if (this.bubble.exists && this.bubble.x >= this.initialx - 10 && this.bubble.x <= this.initialx + 10 && this.bubble.y >= this.initialy - 10 && this.bubble.y <= this.initialy + 10)
        {
            this.sprite.x = this.bubble.x;
            this.sprite.y = this.bubble.y;
            this.sprite.revive(100);
            game.camera.follow(this.sprite);
            this.bubble.exists = false;
        }    
    }

	this.updatePlayerTarget(game);

};

Player.prototype.respawn = function(game) {
    this.lives--;
    this.livesText.setText('' + this.lives);
    if (this.lives > 0)
    {    
        this.bubble.x = this.sprite.x;
        this.bubble.y = this.sprite.y;
        this.bubble.exists = true;
        game.camera.follow(this.bubble);

        game.physics.arcade.moveToXY(this.bubble, this.initialx, this.initialy, 50, 1000);
    }
    else
    {
        // game over
        
    }
    

};