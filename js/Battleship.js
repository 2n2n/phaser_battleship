var Battleship = {};
Battleship.enemyBoard = {};
Battleship.myBoard = {};
Battleship.Game = function(game) {}
Battleship.x = 0;
Battleship.y = 0;
Battleship.selected;
Battleship.LineTo;

Battleship.Game.prototype = {
    preload: function(game) {
        game.load.image('ship', 'assets/battleship.png');
        game.stage.backgroundColor = "#0B65F8";
    },
    render: function(game) {
        if(Battleship.LineTo != undefined ) {
            game.debug.lineInfo(Battleship.LineTo, 32,200);
            game.debug.geom(Battleship.LineTo);
        }
        if(Battleship.selected != undefined)
            game.debug.spriteInfo(Battleship.selected,32, 32);
    },
    create: function(game) {
        Battleship.Ships;
        Battleship.EnemyShip;

        // create the platoons   
        //create the ships board
        Battleship.Ships = makeBoardGroup(game, [
            ["o","o","o","x","o"],
            ["x","o","x","o","o"],
            ["o","o","o","o","x"]
        ]);


        Battleship.EnemyShip = makeBoardGroup(game, [
            ["o","o","o","x","o"],
            ["x","o","x","o","o"],
            ["o","o","o","o","x"]
        ]);
        Battleship.EnemyShip.enableBody = true;
        Battleship.Ships.enableBody = true;

        Battleship.Ships.x = game.world.centerX - (Battleship.Ships.width/2);
        Battleship.Ships.y = game.world.centerY + (Battleship.Ships.height/2);

        Battleship.EnemyShip.x = game.world.centerX - (Battleship.EnemyShip.width/2);
        Battleship.EnemyShip.y = game.world.centerY - (Battleship.EnemyShip.height);

        game.physics.arcade.enable([Battleship.Ships, Battleship.EnemyShip]);

        // flip the position of the enemy platoon
        Battleship.EnemyShip.forEachAlive(function(ship) {
            ship.angle = 180;
        });

    },
    update: function(game) {
        if(Battleship.selected != undefined ) {
            var angle = Math.atan2(Battleship.y - game.input.mousePointer.y, Battleship.x - game.input.mousePointer.x) * 180 / Math.PI;
            Battleship.selected.angle = Phaser.Math.radToDeg(Battleship.LineTo.normalAngle)-180;
            Battleship.LineTo.end.set(game.input.mousePointer.x, game.input.mousePointer.y);

        }

        game.input.onUp.add(function(pointer) {
            if(Battleship.selected != undefined ) Battleship.selected.movingTween.resume();
            Battleship.selected = undefined;
            Battleship.LineTo = undefined
        });
    }
}

function makeBoardGroup (game, pattern) {

    var maxRow = 3;
    var maxCol = 5;
    var padding = 70
    var X = 0;
    var Y = 0;
    var posY = 0;
    var posX;

    var group = game.add.group();
    for(var row = 0; maxRow > row; row++) {
        posX = 0;
        for(var col = 0; maxCol > col; col++) {
            console.log(pattern[row][col]);
            if(pattern[row][col] == 'x') {
                var shipModel = new Phaser.Sprite(game, posX, posY,'ship');
                shipModel.scale.setTo(0.3,0.3);
                shipModel.enableBody = true;
                shipModel.inputEnabled = true;
                shipModel.movingTween = game.add.tween(shipModel).to({ y: posY - Math.floor((Math.random() * 10) + 1), x: posX - Math.floor((Math.random() * 10) + 1) }, 1100, "Linear", true, 1, 20, true);
                shipModel.movingTween.loop(true);
                shipModel.anchor.setTo(0.5, 0.5);
                shipModel.events.onInputDown.add(function(ship, pointer) {

                    Battleship.x = pointer.x;
                    Battleship.y = pointer.y;
                    Battleship.LineTo = new Phaser.Line(ship.worldPosition.x, ship.worldPosition.y, pointer.x, pointer.y);

                    ship.movingTween.pause();
                    Battleship.selected = ship;
                });
                group.addChild(shipModel);
            }

            posX += padding;

        }
        posY += padding;
    }  // end loop

    return group;
}