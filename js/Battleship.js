var Battleship = {};
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

        Battleship.EnemyFleet.forEachAlive(function(ship) {
            game.debug.body(ship);

        });
        game.debug.geom(game.camera.view)
        game.debug.cameraInfo(game.camera, 500, 32);

    },
    create: function(game) {
        game.world.setBounds(0, 0, 1920, 1200);
        var text = game.add.text(0,0, "Battleship v0.0", {
            font: 'bold 32px IM Fell DW Pica',
            fill: '#fff',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        });
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        text.setTextBounds(game.world.centerY, game.world.centerX - (text.width/2), 800, 100);

        Battleship.Fleet;
        Battleship.EnemyFleet;

        // create the platoons   
        //create the ships board
        Battleship.Fleet = makeBoardGroup(game, [
            ["o","o","o","x","o"],
            ["x","o","x","o","o"],
            ["o","o","o","o","x"]
        ], 'myfleet');

        game.camera.focusOn(Battleship.Fleet.children[0]);

        Battleship.EnemyFleet = makeBoardGroup(game, [
            ["o","o","o","x","o"],
            ["x","o","x","o","o"],
            ["o","o","o","o","x"]
        ], 'enemyfleet');

        game.physics.arcade.enable([Battleship.Fleet, Battleship.EnemyFleet]);

        // initialize the battleshi and Enemyship and bind any events needed.
        [Battleship.Fleet, Battleship.EnemyFleet].forEach(function(group) {  
            var x = 0;
            var y = 0;

            group.enableBody = true;
            if(group.name == 'myfleet') { // place your fleet below the screen
                x = game.world.centerX - (group.width/2);
                y = game.world.centerY + (group.height/2);
            }
            else { // place enemyfleet above your screen
                x = game.world.centerX - (group.width/2);
                y = game.world.centerY - (group.height);
            }

            // position the board
            group.x = x;
            group.y = y;

            group.forEachAlive(function(ship) {

                if(ship.parent.name == 'enemyfleet') {
                    ship.pivot.setTo(0.5,0.5);
                    ship.angle = 180;
                }
                if(Battleship.TURN == ship.parent.name) {
                    ship.ammo = 1
                }

                // bind event callbacks here.
                ship.events.onInputDown.add(function(activeShip, pointer) {
                    if(Battleship.TURN == activeShip.parent.name) {
                        Battleship.x = pointer.x;
                        Battleship.y = pointer.y;
                        Battleship.LineTo = new Phaser.Line(activeShip.worldPosition.x, activeShip.worldPosition.y, pointer.x, pointer.y);
                        Battleship.selected = activeShip;
                        game.camera.follow(Battleship.selected, Phaser.Camera.FOLLOW_PLATFORMER);
                        
                    }


                });

                ship.events.onInputOver.add(function(activeShip) {
                    // make sure it's your turn to attack and always check for ammunition ;)
                    if(Battleship.TURN != activeShip.parent.name) {
                        if(Battleship.selected != undefined && Battleship.selected.ammo > 0) {
                            activeShip.kill(); 
                            Battleship.selected.ammo -= 1;     
                        }
                        else {
                            console.log('no ammunition');
                        }
                    } 

                });
            });

        });
        game.camera.focusOnXY(game.world.centerX, game.world.centerY);
        this.cursors = game.input.keyboard.createCursorKeys();

    },
    update: function(game) {
        if (this.cursors.up.isDown)
        {
            game.camera.y -= 4;
        }
        else if (this.cursors.down.isDown)
        {
            game.camera.y += 4;
        }

        if (this.cursors.left.isDown)
        {
            game.camera.x -= 4;
        }
        else if (this.cursors.right.isDown)
        {
            game.camera.x += 4;
        }

        if(Battleship.selected != undefined ) {
            var angle = Math.atan2(Battleship.selected.y - game.input.mousePointer.y, Battleship.selected.x - game.input.mousePointer.x) * 180 / Math.PI;
            Battleship.selected.angle = Phaser.Math.radToDeg(Battleship.LineTo.normalAngle)-180;
            Battleship.LineTo.end.set(game.input.mousePointer.x, game.input.mousePointer.y);

        }

        game.input.onUp.add(function(pointer) {
            game.camera.unfollow(Battleship.selected);
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
                // shipModel.movingTween = game.add.tween(shipModel).to({ y: posY - Math.floor((Math.random() * 10) + 1), x: posX - Math.floor((Math.random() * 10) + 1) }, 1100, "Linear", true, 1, 20, true);
                // shipModel.movingTween.loop(true);
                shipModel.anchor.setTo(0.5, 0.5);

                group.addChild(shipModel);
            }
            else {
                cloud = game.add.sprite(posX,posY, 'cloud');
                cloud.enableBody = true;
                cloud.scale.set(3.0,3.0);
                cloud.anchor.setTo(0.5, 0.5);
                group.add(cloud);
            }

            posX += padding;

        }
        posY += padding;
    }  // end loop

    return group;
}