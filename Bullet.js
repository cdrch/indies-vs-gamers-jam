var Bullet = function (game, key) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.hitDamage = 5;
    this.destroyAtHit = true;
    this.damageOverTime = 0;
    this.destroyAtHit = true;
    this.stunTime = 0;
    this.weaknessAmount = 0;

    this.blowAtDestination = false;
    this.destX = 0;
    this.destY = 0;

    this.tracking = false;
    this.scaleSpeed = 0;

};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

    gx = gx || 0;
    gy = gy || 0;
    this.reset(x, y);
    this.scale.set(1);
    //this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
    this.rotation = this.game.physics.arcade.moveToXY(this, gx, gy, speed);
    //this.body.gravity.set(gx, gy);
};

Bullet.prototype.fireCircle = function (x, y, angle, speed, gx, gy) {
    gx = gx || 0;
    gy = gy || 0;
    this.reset(x, y);
    this.scale.set(1);
    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
    this.angle = angle;
};

Bullet.prototype.update = function () {
    if (this.scaleSpeed > 0)
    {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }

    this.game.physics.arcade.collide(
            this, this.game.layer,
            this.killThis, null, this);


    var destination = new Phaser.Point(destX, destY);

    var distance = this.game.physics.arcade.distanceBetween(this, destination);

    if(distance < 1)
    {

    }
};

Bullet.prototype.killThis = function() {
    this.kill();
}

