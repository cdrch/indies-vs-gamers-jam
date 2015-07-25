var Ghost = function(game, key, speed)
{
    //var sound = game.add.audio('skeletonBow', 0.5, false);

	Enemy.call(this, game, key, speed, 1, 100, true, true);

	this.animations.add('walk', [0 ,1 , 2, 3, 2, 1], 15, true);

    this.currentGame = game;

    this.animations.play('walk');
    this.shouldPlayAnimation = 'walk';

    game.add.existing(this);

};


Ghost.prototype = Object.create(Enemy.prototype);
Ghost.prototype.constructor = Ghost;

Ghost.prototype.killPlayer = function(ghost, player)
{
    player.damage(100);
};

Ghost.prototype.update = function()
{
    this.moveTo(this.targetPlayer.sprite.x, this.targetPlayer.sprite.y);

    this.currentGame.physics.arcade.collide(
            this, this.currentGame.player.sprite,
            this.killPlayer, null, this);
}