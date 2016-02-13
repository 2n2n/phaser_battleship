var BattleshipSingle = {};
BattleshipSingle.Game = function(game) {};
var line, x = 0, y = 0;
BattleshipSingle.Game.prototype = {
    preload: function(game) {
        game.load.image('ship', 'assets/battleship.gif');
        game.load.image('cloud', 'assets/cloud_1.png');
        game.load.image("background", "assets/wallpaper.png");   
    },
    create: function(game){
        // console.log(game);
        console.log(this)
        game.add.tileSprite(0, 0, 1000, 1000, 'background'); 
        // new Ship(game);
        game.stage.backgroundColor = "#0B65F8";

        // assign the player to a variable to access allover the game.
        this.player = new Hero(game)
        
        // for debugging later
        line = new Phaser.Line();

        line.start = this.player.position;
        line.end = game.input.position;
    },
    update: function(game) {
        
        
    },
    render: function(game) {
        // game.debug.body(this.player);
        game.debug.bodyInfo(this.player, 32, 32);
        // game.debug.body(this.player);
        // game.debug.spriteBounds(this.player, 'black', false);
        // game.debug.geom(this.point, 'rgb(0,255,0)');

        console.log(line.end)
        game.debug.geom(line);

    }
};
