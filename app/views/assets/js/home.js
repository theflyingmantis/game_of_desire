console.log('JS is working');
window.onload = function() {
  var game = new Phaser.Game(900, 900, Phaser.AUTO, 'game_stage');
  game.state.add('menu',MenuState,true);
  game.state.add('level_one',LevelOneState);
};
