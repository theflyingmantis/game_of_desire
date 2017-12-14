console.log('JS is working');
window.onload = function() {
  var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'game_stage');
  game.state.add('menu',MenuState,true);
};
