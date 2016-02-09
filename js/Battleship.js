var Battleship = {};
Battleship.enemyBoard = {};
Battleship.myBoard = {};
Battleship.Game = function(game) {}

Battleship.Game.prototype = {
    preload: function(game) {
        game.load.image('ship', 'assets/battleship.png');
        game.stage.backgroundColor = "#0B65F8";
    },
    render: function(game) {
        Battleship.Ships.forEach(function(ship) {
            // game.debug.body(ship);
        });
    },
    create: function(game) {
        Battleship.Ships = game.add.group();
        Battleship.EnemyShip = game.add.group();
        Battleship.EnemyShip.enableBody = true;
        Battleship.Ships.enableBody = true;

        // create sample battleshipEnemy
        Battleship.EnemyShip.create(0,0, 'ship');
        Battleship.EnemyShip.tint = 0xff00ff;
        var maxRow = 3;
        var maxCol = 5;
        var padding = 70
        var X = 0;
        var Y = 0;
        var posY = 0;
        var posX;

        for(var row = 0; maxRow > row; row++) {
            posX = 0;
            for(var col = 0; maxCol > col; col++) {
                var shipModel = new Phaser.Sprite(game, posX, posY,'ship');
                shipModel.scale.setTo(0.3,0.3);
                shipModel.enableBody = true;
                shipModel.inputEnabled = true;
                game.add.tween(shipModel).to({ y: posY - Math.floor((Math.random() * 10) + 1), x: posX - Math.floor((Math.random() * 10) + 1) }, 1100, "Linear", true, 1, 20, true).loop(true);
                shipModel.events.onInputDown.add(function(sprite, pointer) {
                    sprite.kill();
                });

                Battleship.Ships.addChild(shipModel);

                posX += padding;

            }
            posY += padding;
        }  // end loop

        // loop all battleships and bind events here.
        // Battleship.Ships.forEachAlive(function(ship) {
        //     ship.kill();
        // })
        Battleship.Ships.x = game.world.centerX - (Battleship.Ships.width/2);
        Battleship.Ships.y = game.world.centerY - (Battleship.Ships.height/2);
        game.physics.arcade.enable(Battleship.Ships);
    },
    update: function(game) {
    }
}