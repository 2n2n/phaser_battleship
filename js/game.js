(function(Phaser, BShip, window , undefined) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');
    game.state.add('menu', BShip.MainMenu );
    game.state.start('menu');
})(Phaser, Battleship, window);