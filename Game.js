
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        //this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
        //this.logo.anchor.setTo(0.5, 0.5);

        //var testingText = "Cupcake ipsum dolor sit amet soufflé marshmallow cheesecake cookie. Chocolate bar pie halvah marzipan carrot cake. Chupa chups tiramisu cake sweet roll jelly-o. Liquorice I love cotton candy cotton candy. Sugar plum I love lemon drops lemon drops I love gummies cake. Icing chocolate bar tiramisu pie sweet roll sesame snaps marzipan cheesecake. Lollipop sesame snaps caramels gummies ice cream I love muffin. Croissant carrot cake jelly beans lemon drops lollipop gummi bears. Gummies lemon drops pie. Pudding pie chocolate cake sesame snaps. Chupa chups marzipan sweet croissant. Bonbon I love marshmallow jujubes bear claw. Dragée pastry soufflé powder tiramisu jelly-o soufflé. Tart cake gummies I love fruitcake cupcake. Pudding pastry dessert. Dessert carrot cake cake candy canes biscuit. Gingerbread pudding halvah dragée candy canes icing toffee. I love chocolate bar chocolate I love ice cream. Biscuit I love macaroon. Cookie cupcake jelly beans marshmallow croissant muffin soufflé I love. Lollipop jujubes candy croissant cheesecake sesame snaps dragée bonbon. Toffee sugar plum lollipop chupa chups pie halvah. Cookie biscuit candy gingerbread jelly beans jelly beans I love jelly I love. Lollipop chupa chups I love macaroon wafer. Sweet danish I love chupa chups muffin candy. Jelly beans chocolate bar soufflé pudding apple pie. Bear claw carrot cake apple pie danish. Soufflé cotton candy lollipop bear claw toffee. Liquorice bonbon marshmallow. Toffee croissant sesame snaps candy canes tiramisu I love. Fruitcake powder chocolate cake soufflé lemon drops soufflé jelly sweet jelly. Cake sweet roll jelly beans gingerbread halvah powder dessert I love brownie. Macaroon wafer I love cookie jujubes sweet halvah. Cupcake marzipan liquorice cookie cupcake. Toffee jelly muffin tart sesame snaps muffin oat cake. Biscuit candy muffin. Cake donut jelly cake marzipan marshmallow cookie danish jelly beans. Pudding cotton candy chocolate gummies sesame snaps. Apple pie cookie cake danish. Icing danish pastry sugar plum pie marshmallow cotton candy marzipan sweet. Topping I love I love marshmallow brownie oat cake. Danish candy canes cheesecake dessert gummies I love. Powder I love powder icing carrot cake muffin soufflé sugar plum cookie. Dragée fruitcake jelly beans lemon drops marzipan jujubes. Danish pie candy canes cake tootsie roll cake I love I love. Candy canes topping liquorice. Topping sugar plum chupa chups I love. Chocolate cake I love gingerbread I love jelly beans. Cheesecake chocolate bar liquorice sesame snaps. Topping sesame snaps jelly lemon drops gummies. Macaroon apple pie chocolate sesame snaps muffin marzipan. Wafer biscuit chocolate. Jujubes wafer halvah cookie pastry chocolate bar cake chupa chups powder. Cupcake chocolate sugar plum sesame snaps liquorice caramels oat cake cheesecake carrot cake. Candy cookie donut cotton candy marshmallow lemon drops lollipop. Carrot cake pudding brownie dragée chocolate cake halvah marzipan cheesecake. I love macaroon fruitcake soufflé lollipop. Biscuit cheesecake I love I love cookie. Gingerbread soufflé tart macaroon jelly. Tootsie roll cookie I love tart carrot cake tart cotton candy. Toffee toffee oat cake chupa chups dessert. Topping candy bonbon I love I love chocolate cake tart sugar plum. Caramels candy jelly I love bear claw liquorice. Tart donut dessert sugar plum muffin chocolate bar marshmallow marshmallow danish. I love I love cotton candy tootsie roll I love halvah soufflé. Marshmallow I love I love.";

        //this.textBox = new TextBox(this, testingText, 'textBG', Phaser.Keyboard.DOWN, this.world.centerX, this.world.centerY, 0, true, true, { font: "30px Arial", fill: "#4400ff", align: "center" });

        this.player = new Entity(this.game, this.world.centerX, this.world.centerY, 'player', 0, 10, 1);
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
