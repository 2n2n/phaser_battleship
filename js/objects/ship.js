// the Ship base object
function Ship(game, x, y) {
    var x = x || game.world.randomX;
    var y = y || game.world.randomY;

    Phaser.Sprite.call(this, game, x, y, 'ship');

    //add physics to this ship
    game.physics.arcade.enable(this);
    
    //setup the body
    this.enableBody = true;
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(0.8, 0.8);
    this.scale.setTo(0.3, 0.3);
    this.anchor.setTo(0.5, 0.5);

    // by default random the body tint
    var rand = Math.random();   
    this.tint = rand * 0xffffff;

    console.log('hero is added to the game')
    game.add.existing(this);

}

Ship.prototype = Object.create(Phaser.Sprite.prototype);
Ship.prototype.constructor = Ship;


// The hero object
function Hero(game, x, y) {
    Ship.call(this, game, x, y);

    //setup the pointer
    game.input.addMoveCallback(function(pointer, x, y) {
        var rotation = new Phaser.Physics.Arcade(game);
        rotation = rotation.angleToXY(this, x, y);
        this.rotation = rotation;
    }, this);

    this.cursor = game.input.keyboard.addKeys({
        'space': Phaser.Keyboard.SPACEBAR
    })
    this.tint = 0xFFFFFF;
}

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;
Hero.prototype.update = function() {
    var game = this.game;
    if(this.cursor.space.isDown) {
            this.rotation = game.physics.arcade.accelerateToPointer(this , game.input.cursor, 20, 200, 200);
        }
} 