var BattleshipSingle = {};
BattleshipSingle.Game = function(game) {};

BattleshipSingle.Game.prototype = {
    preload: function(game) {
        game.load.image('ship', 'assets/battleship.png');
        game.load.image('cloud', 'assets/cloud_1.png');
    },
    create: function(game){
        game.stage.backgroundColor = "#0B65F8";
        
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');  
        this.player.anchor.set(0.5);
        console.log(this.player)
        game.physics.arcade.enable(this.player);
    },
    update: function(game) {

    },
    render: function(game) {
        game.debug.geom(new Phaser.Point(this.player.pivot.x, this.player.pivot.y), '#ffff00');
    }
};
