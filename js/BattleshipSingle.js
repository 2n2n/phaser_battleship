var BattleshipSingle = {};
BattleshipSingle.Game = function(game) {};
var line;
BattleshipSingle.Game.prototype = {
    preload: function(game) {
        game.load.image('ship', 'assets/battleship.png');
        game.load.image('cloud', 'assets/cloud_1.png');
        game.load.image("background", "assets/wallpaper.png");   
    },
    create: function(game){
        game.world.
        game.add.tileSprite(0, 0, 1000, 1000, 'background'); 
        game.stage.backgroundColor = "#0B65F8";
        game.world.backgroun
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');  
        this.player.enableBody = true;
        this.player.scale.setTo(0.5, 0.5)
        this.player.anchor.setTo(0.5,0.5);
        this.point = new Phaser.Point(this.player.x, this.player.y);


        // enable player physics
        game.physics.arcade.enable(this.player);
        // this.player.addChild(this.point);
        // console.log(this.player.offsetX, this.player.offsetY);
        game.input.addMoveCallback(function(pointer, x, y) {
            line = new Phaser.Line(this.x, this.y, x, y);
            this.angle = Phaser.Math.radToDeg(line.normalAngle) - 180;

        }, this.player)

    },
    update: function(game) {
    },
    render: function(game) {
        // game.debug.body(this.player);
        game.debug.body(this.player);
        game.debug.spriteBounds(this.player, 'black', false);
        game.debug.geom(this.point, 'rgb(0,255,0)');
        game.debug.geom(line, 'rgb(0,255,0)');

    }
};
