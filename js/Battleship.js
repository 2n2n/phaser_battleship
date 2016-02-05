var Battleship = {};
Battleship.enemyBoard = {};
Battleship.myBoard = {};
Battleship.MainMenu = function(game) {}

Battleship.MainMenu.prototype = {
    preload: function(game) {
        game.load.image('ship', 'assets/battleship.png');
        game.stage.backgroundColor = "#0B65F8";
    },
    render: function(game) {
        Battleship.Ships.forEach(function(ship) {
            game.debug.bodyInfo(ship, 32, 32)
            game.debug.body(ship);
        });
    },
    create: function(game) {
        // console.log(Battleship.myBoard.x, Battleship.myBoard.y)
        Battleship.Ships = game.add.group();
        Battleship.Ships.enableBody = true;
        var maxRow = 3;
        var maxCol = 5;
        var shipWidth = 90;
        var shipHeight = 110;
        var padding = 80
        var X = 0;
        var Y = 0;
        var posY = 0;
        var posX;

        for(var row = 0; maxRow > row; row++) {
            posX = 0;
            for(var col = 0; maxCol > col; col++) {
                var shipModel = new Phaser.Sprite(game, posX, posY,'ship');
                shipModel.scale.setTo(0.5,0.5);
                shipModel.enableBody = true;
                shipModel.inputEnabled = true;
                game.add.tween(shipModel).to({ y: posY - Math.floor((Math.random() * 10) + 1), x: posX - Math.floor((Math.random() * 10) + 1) }, 1100, "Linear", true, 1, 20, true).loop(true);
                shipModel.events.onInputDown.add(function(sprite, pointer) {
                    sprite.kill();
                });

                Battleship.Ships.addChild(shipModel);

                posX += shipWidth;


                 // var ship = game.add.sprite(posX, posY, 'ship');
                 // ship.scale.setTo(0.5, 0.5);
                 // game.add.tween(ship).to({ y: posY-10 }, 1100, "Linear", true, 1, 20, true).loop(true);
                 
                 // add eventListener to ship
            }
            posY += shipHeight;
        }  // end loop
        // console.log(Ships.pivot)
        // Ships.pivot.setTo(0.5 ,0.5);
        // Ships.position.setTo(game.world.centerX, game.world.centerY);
    }
}