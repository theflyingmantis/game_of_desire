var LevelOneState = function(){
  this.player; //player token sprite
  this.alien; //alien token sprite
  this.turnOk = true; //manage when players can start rolling die
  this.player_turn = true; //manage whose turn it is
  this.player_skip = false; //manage whether player should skip next turn
  this.player_tween; //tween object to handle moving player token's sprite
  this.alien_tween; //tween object to handle moving alien token's sprite
  this.alien_skip = false; //manage whether alien should skip next turn
  this.game_over = false; //manage whether game is over
  this.winner; //string variable to store who won the game
  this.winner_blind; //game over background sprite image
  this.winner_badge; //sprite image used to show who won the game

  //coordinates for grids
  this.grids = [[100,750],[200,750],[300,750],[400,750],[500,750],
    [600,750],[700,750],[800,750],[800,650],[800,550],
    [700,550],[600,550],[500,550],[400,550],[300,550],
    [300,450],[300,350],[400,350],[500,350],[600,350],
    [700,350],[800,350],[800,250],[800,150],[700,150],
    [600,150],[500,150],[400,150],[300,150],[200,150]];
  
  this.volume;

  //create special grids coordinates
  this.special_grids = [[4,"FORWARD 2"],[9,"BACK 1"],[13,"SKIP 1"],[14,"SKIP 1"],[18,"SKIP 1"],[19,"SKIP 1"],[20,"SKIP 1"],[23,"FORWARD 1"],[27,"BACK 1"]];

  this.player_grid = 0; //player token's current grid
  this.alien_grid = this.grids.length-1; //alien token's current grid
  this.music;
  this.roll_btn; //button for player to roll die
  this.exit_btn; //button for user to quit game and return to menu state
  this.turn_icon; //UI icon to show whose turn it is
  this.dice_icon; //UI icon to show die roll result
};

LevelOneState.prototype.init = function(){

};

LevelOneState.prototype.preload = function(){
  this.load.image("board_bg","assets/img/board.png");
  this.load.image("winner_blind","assets/img/winner_blind.png");
  this.load.atlas("atlas","assets/img/sprites.png","assets/js/sprites.json");
  this.load.audio("music","assets/audio/game.mp3","assets/audio/game.ogg");
  this.load.image("volume_on","assets/img/vol_on.png");
  this.load.image("volume_off","assets/img/vol_off.png");
  
};

LevelOneState.prototype.create = function(){
  //create the board background
  var bg = this.add.image(this.world.centerX,this.world.centerY,'board_bg');
  bg.anchor.setTo(0.5,0.5);

  this.music = this.add.audio("music",1,true);
  this.music.play();


  //create player token
  this.player = this.add.sprite(this.grids[this.player_grid][0],this.grids[this.player_grid][1],'atlas','hero_idle1.png');
  this.player.anchor.setTo(0.5,0.5);

  //create alien token
  this.alien = this.add.sprite(this.grids[this.alien_grid][0],this.grids[this.alien_grid][1],'atlas','enemy_idle1.png');
  this.alien.anchor.setTo(0.5,0);

  //create turn status icon
  this.turn_icon = this.add.sprite(400,0,'atlas','turn_hero.png');
  this.turn_icon.anchor.setTo(0.5,0);

  //create dice status icon
  this.dice_icon = this.add.sprite(500,0,'atlas','dice_one.png');
  this.dice_icon.anchor.setTo(0.5,0);

  this.winner_blind = this.add.image(this.world.centerX,this.world.centerY,'winner_blind');
  this.winner_blind.anchor.setTo(0.5,0.5);
  this.winner_blind.kill();

  this.winner_badge = this.add.image(this.world.centerX,this.world.centerY,'atlas','winner_hero.png');
  this.winner_badge.anchor.setTo(0.5,0.5);
  this.winner_badge.kill();

  //volume button
  this.volume = true;
  this.volume_btn = this.add.button(50,6,'volume_on',this.VolumeToggle,this);
  this.volume_btn.scale.setTo(0.4,0.4);
  //create exit button
  this.exit_btn = this.add.button(800,20,'atlas',this.GameExit,this,'exit_over_btn.png','exit_btn.png','exit_over_btn.png','exit_btn.png');
  this.exit_btn.anchor.setTo(0.5,0);

  //create roll dice button
  this.roll_btn = this.add.button(this.world.centerX,this.world.centerY,'atlas',this.PlayerRollDice,this,'dice_over_btn.png','dice_btn.png','dice_over_btn.png','dice_btn.png');
  this.roll_btn.anchor.setTo(0.5,0.5);

  //create animation of player
  this.player.animations.add('idle',["hero_idle1.png","hero_idle2.png","hero_idle3.png"],5,true);
  this.player.animations.add('move',["hero_run1.png","hero_run2.png","hero_run3.png","hero_run4.png"],5,true);
  this.player.animations.play('idle');

  this.player.animations.play('idle');//start playing the idle animation for the player
  //create two animations: idle and move; for the alien token
  this.alien.animations.add('idle',["enemy_idle1.png","enemy_idle2.png"],5,true);
  this.alien.animations.add('move',["enemy_walk1.png","enemy_walk2.png"],5,true);
  this.alien.animations.play('idle');
};

LevelOneState.prototype.PlayerRollDice = function(){
  this.turnOk = false;
  this.roll_btn.kill();
  this.MoveToken("player",this.GetDiceOutput());
};

LevelOneState.prototype.AlienRollDice = function(){
  this.turnOk = false;
  this.MoveToken("alien",-this.GetDiceOutput());
};

LevelOneState.prototype.VolumeToggle = function(){
  console.log('working');
  if (this.volume){
    this.music.stop();
    this.volume_btn.loadTexture("volume_off",0,false);
  }
  else {
    this.music.play();
    this.volume_btn.loadTexture("volume_on");
  }
  this.volume = !this.volume;
  
}

LevelOneState.prototype.GetDiceOutput = function(){
  var dice_out = Math.round((Math.random()*5))+1;
  switch(dice_out){
    case 1:
      this.dice_icon.frameName = "dice_one.png";
      break;
    case 2:
      this.dice_icon.frameName = "dice_two.png";
      break;
    case 3:
      this.dice_icon.frameName = "dice_three.png";
      break;
    case 4:
      this.dice_icon.frameName = "dice_four.png";
      break;
    case 5:
      this.dice_icon.frameName = "dice_five.png";
      break;
    case 6:
      this.dice_icon.frameName = "dice_six.png";
      break;
  }
  return dice_out;
};

LevelOneState.prototype.MoveToken = function(target,stps){
  this.PrepareMoveGrids(target,stps);	
};

LevelOneState.prototype.PrepareMoveGrids = function(target,stps){
  var gridX = [];
  var gridY = [];
  var curr_grid;
  var curr_tween;
  if(target == "player"){
    curr_grid = this.player_grid;
    this.player_tween = this.add.tween(this.player);
    this.player_tween.onComplete.add(this.MoveComplete,this);
    curr_tween = this.player_tween;
    this.player_grid += stps;
    this.player.animations.play('move');
  }else{
    curr_grid = this.alien_grid;
    this.alien_tween = this.add.tween(this.alien);
    this.alien_tween.onComplete.add(this.MoveComplete,this);
    curr_tween = this.alien_tween;
    this.alien_grid += stps;
    this.alien.animations.play('move');
  }

  if(stps > 0){
    for(var i=curr_grid; i<=curr_grid+stps; i++){
      if(this.grids[i]){
        gridX.push(this.grids[i][0]);
        gridY.push(this.grids[i][1]);
      }
    }

  }else{
    for(var i=curr_grid; i>=curr_grid+stps; i--){
      if(this.grids[i]){
        gridX.push(this.grids[i][0]);
        gridY.push(this.grids[i][1]);
      }
    }
  }
  curr_tween.to({x:gridX,y:gridY},1000,'Linear');
  curr_tween.start();
};

LevelOneState.prototype.MoveComplete = function(){
  this.tweens.removeAll();

  this.player.animations.play('idle');
  this.alien.animations.play('idle');

  //check if token has landed on final grid
  if(this.player_turn && this.player_grid >= this.grids.length-1){
    this.GameOver("Player");
  }else if(!this.player_turn && this.alien_grid <= 0){
    this.GameOver("Alien");
  }

  //check if token landed on a special grid
  if(!this.CheckTokenSpecialGrid()){
    this.ResetTurn();
  }
};

LevelOneState.prototype.GameOver = function(winner){
  this.winner = winner;
  this.winner_blind.reset(this.world.centerX,this.world.centerY);
  this.winner_badge.reset(this.world.centerX,this.world.centerY+150);
  this.game_over = true;

  if(winner == "Player")
    this.winner_badge.frameName = "winner_hero.png";
  else
    this.winner_badge.frameName = "winner_alien.png";
};

LevelOneState.prototype.CheckTokenSpecialGrid = function(){
  var tmp_token;
  var tmp_grid;
  if(this.player_turn){
    tmp_token = "player";
    tmp_grid = this.player_grid;
  }else{
    tmp_token = "alien";
    tmp_grid = this.alien_grid;
  }

  var special = this.IsGridSpecial(tmp_grid);
  if(special!="No"){
    this.SpecialMoveToken(tmp_token,special);
    return true;
  }

  return false;
};

LevelOneState.prototype.IsGridSpecial = function(grid){
  var out = "No";
  for(var i=0; i<this.special_grids.length; i++){
    if(grid == this.special_grids[i][0]){
      out = this.special_grids[i][1];
      break;
    }
  }

  return out;
};

LevelOneState.prototype.SpecialMoveToken = function(target,opt){
  switch(opt){
    case "SKIP 1":
      if(target == "player")
        this.player_skip = true;
      else
        this.alien_skip = true;
      this.ResetTurn();
      break;
    case "BACK 1":
      if(target == "player")
        this.MoveToken(target,-1);
      else
        this.MoveToken(target,1);
      break;
    case "FORWARD 1":
      if(target == "player")
        this.MoveToken(target,1);
      else
        this.MoveToken(target,-1);
      break;
    case "FORWARD 2":
      if(target == "player")
        this.MoveToken(target,2);
      else
        this.MoveToken(target,-2);
      break;
    default:
      break;
  }
};

LevelOneState.prototype.ResetTurn = function(){
  this.player_turn = !this.player_turn;
  this.turnOk = true;

  //check if should skip turn
  if(this.player_turn && this.player_skip){
    this.player_turn = !this.player_turn;
    this.player_skip = false;
  }

  if(!this.player_turn && this.alien_skip){
    this.player_turn = !this.player_turn;
    this.alien_skip = false;
  }
};

//Function for the Exit Button
LevelOneState.prototype.GameExit = function(){
  //re-initialise all properties
  this.turnOk = true;
  this.player_turn = true; //else it's alien's turn
  this.player_skip = false; //else player skips a turn
  this.alien_skip = false; //else alien skips a turn
  this.game_over = false;

  this.player_grid = 0;
  this.alien_grid = this.grids.length-1;
  this.music.stop();
  this.state.start("menu");
};

LevelOneState.prototype.update = function(){
  if(!this.game_over){
    if(this.player_turn && this.turnOk){
      this.turn_icon.frameName = "turn_hero.png";
      this.roll_btn.reset(this.world.centerX,this.world.centerY);
    }

    if(!this.player_turn && this.turnOk){
      this.turn_icon.frameName = "turn_alien.png";
      this.AlienRollDice();
    }
  }
};
