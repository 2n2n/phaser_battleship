var BattleshipSingle = {};
BattleshipSingle.Game = function(game) {};
var line;
BattleshipSingle.Game.prototype = {
    preload: function(game) {
        game.load.image('ship', 'assets/battleship.gif');
        game.load.image('cloud', 'assets/cloud_1.png');
        game.load.image("background", "assets/wallpaper.png");   
    },
    create: function(game){

        game.add.tileSprite(0, 0, 1000, 1000, 'background'); 
        game.stage.backgroundColor = "#0B65F8";

        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');  
        this.player.enableBody = true;
        game.physics.arcade.enable(this.player);

        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.setTo(0.8,0.8);
        this.player.scale.setTo(0.3, 0.3);
        this.player.anchor.setTo(0.5,0.5);
        // this.point = new Phaser.Point(this.player.x, this.player.y);

        // enable player physics

        game.input.addMoveCallback(function(pointer, x, y) {
            line = new Phaser.Line(this.x, this.y, x, y);
            var rotation = new Phaser.Physics.Arcade(game);
            rotation = rotation.angleToXY(this, x, y);
            console.log(rotation);
            this.rotation = rotation;
        }, this.player);


        this.cursor = game.input.keyboard.addKeys({
            'space': Phaser.Keyboard.SPACEBAR
        });

        // this.gamePointer = new Phaser.Pointer(game, 1,  Phaser.PointerMode.CURSOR);
    },
    update: function(game) {

        if(this.cursor.space.isDown) {
            this.player.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.player.angle , 100))
        }
        else if(this.cursor.space.isUp) {
            game.physics.arcade.computeVelocity(1, this.player.body, this.player.body.velocity, 0, 20, 200)
            // game.physics.arcade.computeVelocity(0, this.player.body, this.player.body.velocity, 0, 20, 200)
        // //     console.log(this.input.mousePointer.position);
        // //     this.player.body.velocity = this.input.mousePointer.position;
        }
        
    },
    render: function(game) {
        // game.debug.body(this.player);
        game.debug.bodyInfo(this.player, 32, 32);
        // game.debug.body(this.player);
        // game.debug.spriteBounds(this.player, 'black', false);
        // game.debug.geom(this.point, 'rgb(0,255,0)');
        // game.debug.pointer(this.input.mousePointer);

    }
};
