var Battleship = {};
Battleship.enemyBoard = [];
Battleship.myBoard = [];
Battleship.MainMenu = function(game) {}

Battleship.MainMenu.prototype = {
    preload: function(game) {
        game.load.image('ship', 'assets/battleship.png');
        game.stage.backgroundColor = "#2196F3";
    },
    create: function(game) {
        var shipModel = new Phaser.Sprite(game, 0,0,'ship');
        shipModel.scale.setTo(0.5,0.5);

        var maxRow = 5;
        var maxCol = 5;
        var shipWidth = shipModel.width;
        var shipHeight = shipModel.height;
        var X = 0;
        var Y = 0;
        var posY = 0;
        var posX;
        for(var row = 0; maxRow > row; row++) {
            posX = 0;
            for(var col = 0; maxCol > col; col++) {
                 var ship = game.add.sprite(posX, posY, 'ship');
                 ship.scale.setTo(0.5, 0.5);
                 game.add.tween(ship).to({ y: posY-10 }, 1100, Phaser.Easing.Bounce.InOut, true, 1, 20, true).loop(true);
                 posX += shipWidth;
                 // add tween effect to ship
            }
            posY += shipHeight;
        }
    }
}