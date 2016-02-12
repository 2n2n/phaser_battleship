var BattleshipSingle = {};
BattleshipSingle.Game = function(game) {};

BattleshipSingle.Game.prototype = {
    preload: function(game) {
        game.load.image('ship', 'assets/battleship.png');
        game.load.image('cloud', 'assets/cloud_1.png');
    },
    create: function(game){
        game.world.setBounds(game.world.bounds.centerX, game.world.bounds.centerY, 1920, 1200);
        game.stage.backgroundColor = "#0B65F8";
        
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
        
    },
    update: function(game) {
        
    },
    render: function(game) {}
};
