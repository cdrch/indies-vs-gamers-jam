var Enemy = function (game, key) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.anchor.set(0.5);

    this.exists = false;
    this.targetPlayer = game.player;
    
    return this;
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.spawn = function (x, y, HP) {

    this.reset(x, y, HP);
    this.scale.set(1);
};

//You will use .damage() to deal damage
//From HTML 5 Shoot Em Up In An Afternoon: 
//Using damage() automatically kill()s the 
//sprite once its health is reduced to zero. 
