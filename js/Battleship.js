var Battleship = {};
Battleship.enemyBoard = [];
Battleship.myBoard = [];
Battleship.MainMenu = function(game) {}

Battleship.MainMenu.prototype = {
    preload: function(game) {
        game.load.image('ship', 'assets/battleship.png');
        game.stage.backgroundColor = "#2196F3";
        // intialize the board
        var maxRow = 5;
        var maxCol = 5;
        for(var row = 0; maxRow > row; row++) {
            this.enemyBoard[row] = [];
            this.myBoard[row] = [];
            for(var col = 0; maxCol > col; col++) {
                this.enemyBoard[row][col] = 'O';
                this.myBoard[row][col] = 'O';
            }
        }
    },
    create: function(game) {
        var myship = game.add.sprite(0,0,'ship');
        myship.scale.setTo(0.5,0.5) = true;
    }
}