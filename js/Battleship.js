var Battleship = {};
Battleship.EnemyShip = {};
Battleship.myBoard = {};
Battleship.Game = function(game) {}
Battleship.x = 0;
Battleship.y = 0;
Battleship.selected;
Battleship.LineTo;
Battleship.TURN = 'myfleet';

Battleship.Game.prototype = {
    preload: function(game) {
        game.load.image('ship', 'assets/battleship.png');
        game.load.image('cloud', 'assets/cloud_1.png');
        game.stage.backgroundColor = "#0B65F8";
    },
    render: function(game) {
        if(Battleship.LineTo != undefined ) {
            game.debug.lineInfo(Battleship.LineTo, 32,200);
            game.debug.geom(Battleship.LineTo);
        }
        if(Battleship.selected != undefined)
            game.debug.spriteInfo(Battleship.selected,32, 32);

        Battleship.EnemyShip.forEachAlive(function(ship) {
            game.debug.geom(ship.hitArea, "rgba(100,50,20,0.2)");
        });
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
        ], 'myfleet');


        Battleship.EnemyShip = makeBoardGroup(game, [
            ["o","o","o","x","o"],
            ["x","o","x","o","o"],
            ["o","o","o","o","x"]
        ], 'enemyfleet');

        // console.log(Battleship.EnemyShip.name, Battleship.Ships.name);
        Battleship.EnemyShip.enableBody = true;
        Battleship.EnemyShip.inputEnabled  = true;

        Battleship.Ships.x = game.world.centerX - (Battleship.Ships.width/2);
        Battleship.Ships.y = game.world.centerY + (Battleship.Ships.height/2);

        Battleship.EnemyShip.x = game.world.centerX - (Battleship.EnemyShip.width/2);
        Battleship.EnemyShip.y = game.world.centerY - (Battleship.EnemyShip.height);

        game.physics.arcade.enable([Battleship.Ships, Battleship.EnemyShip]);

        // set properties inside the sprite here.
        Battleship.Ships.forEachAlive(function(ship) {
            if(Battleship.TURN == ship.parent.name) {
                ship.ammo = 1;
            }
        });
        Battleship.EnemyShip.HitArea = new Phaser.Circle(0, 0, Battleship.EnemyShip.width/2);
        Battleship.EnemyShip.forEachAlive(function(ship) {
            // flip the position of the enemy platoon
            ship.angle = 180;
            ship.hitArea = new Phaser.Circle(ship.width/2, Battleship.EnemyShip.height/2, 32);
            ship.inputEnabled = true;            
            ship.events.onInputOver.add(function() {
                 
                // make sure it's your turn to attack and always check for ammunition ;)
                if(Battleship.TURN != ship.parent.name) {
                    if(Battleship.selected != undefined && Battleship.selected.ammo > 0) {
                        ship.kill(); 
                        Battleship.selected.ammo -= 1;     
                    }
                    else {
                        console.log('no ammunition');
                    }
                } 

            });
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

// This will generate the board group for enemy fleet and your fleet
function makeBoardGroup (game, pattern, groupName) {
    var maxRow = 3;
    var maxCol = 5;
    var padding = 70
    var X = 0;
    var Y = 0;
    var posY = 0;
    var posX;

    var group = game.add.group();
    // if groupName is given name the group.
    group.name = groupName;

    for(var row = 0; maxRow > row; row++) {
        posX = 0;
        for(var col = 0; maxCol > col; col++) {
            if(pattern[row][col] == 'x') {
                var shipModel = new Phaser.Sprite(game, posX, posY,'ship');
                shipModel.scale.setTo(0.3,0.3);
                shipModel.enableBody = true;
                shipModel.inputEnabled = true;
                shipModel.movingTween = game.add.tween(shipModel).to({ y: posY - Math.floor((Math.random() * 10) + 1), x: posX - Math.floor((Math.random() * 10) + 1) }, 1100, "Linear", true, 1, 20, true);
                shipModel.movingTween.loop(true);
                shipModel.anchor.setTo(0.5, 0.5);
                // make different conditions for defender and attacker.
                shipModel.events.onInputDown.add(function(ship, pointer) {
                    if(Battleship.TURN == shipModel.parent.name) {
                        // it's your fleet's turn to move
                        Battleship.x = pointer.x;
                        Battleship.y = pointer.y;
                        Battleship.LineTo = new Phaser.Line(ship.worldPosition.x, ship.worldPosition.y, pointer.x, pointer.y);

                        ship.movingTween.pause();
                        Battleship.selected = ship;
                    };
                });


                group.addChild(shipModel);
            }
            else {
                cloud = game.add.sprite(posX,posY, 'cloud');
                cloud.inputEnabled = false;
                cloud.scale.set(2.0,2.0);
                group.add(cloud);
            }

            posX += padding;

        }
        posY += padding;
    }  // end loop

    return group;
}