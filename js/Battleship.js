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
        if(Battleship.LineTo != undefined ) 
            game.debug.geom(Battleship.LineTo);
        if(Battleship.selected != undefined)
            game.debug.spriteInfo(Battleship.selected,32, 32);
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

                shipModel.anchor.setTo(0.5, 0.5);
                shipModel.events.onInputDown.add(function(ship, pointer) {
                    Battleship.x = pointer.x;
                    Battleship.y = pointer.y;
                    
                    Battleship.LineTo = new Phaser.Line();
                    Battleship.LineTo.start.set(pointer.x, pointer.y);
                    Battleship.selected = ship;
                });
                Battleship.Ships.addChild(shipModel);

                posX += padding;

            }
            posY += padding;
        }  // end loop

        Battleship.Ships.x = game.world.centerX - (Battleship.Ships.width/2);
        Battleship.Ships.y = game.world.centerY - (Battleship.Ships.height/2);
        game.physics.arcade.enable(Battleship.Ships);

        // game.input.onUp.add(function(pointer) {
        //     var angle = game.math.angleBetween(Battleship.x, Battleship.y, game.input.mousePointer.x, game.input.mousePointer.y) * 57.2958;
        //     Battleship.selected.angle = angle;
        // });

    },
    update: function(game) {
        if(Battleship.selected != undefined ) {
            var angle = game.math.angleBetween(Battleship.x, Battleship.y, game.input.mousePointer.x, game.input.mousePointer.y);
            Battleship.selected.angle = game.math.radToDeg(angle);
            Battleship.LineTo.end.set(game.input.mousePointer.x, game.input.mousePointer.y);
        }

        game.input.onUp.add(function(pointer) {
            Battleship.selected = undefined;
            Battleship.LineTo = undefined
        })
        // if (game.input.activePointer.x < Battleship.x) {    
        // mouse pointer is to the left 
        // }  
        // else {    
        // // console.log('mouse at right'); 
            
        // // mouse pointer is to the right  }
        // }
    }
}