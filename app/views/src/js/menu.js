var MenuState = function () {
  this.music;//to store the sound object for the music background  
};

MenuState.prototype.preload = function() {
  this.load.image('logo','assets/img/logo.png');
  this.load.image('start','assets/img/start.png');
  this.load.audio("music","assets/audio/menu.mp3","assets/audio/menu.ogg");

};

MenuState.prototype.create = function() {
  var logo =   this.add.sprite(this.world.centerX,this.world.centerY-200,'logo');
  logo.scale.setTo(0.9,0.9)
  logo.anchor.setTo(0.5,0.5);//set the anchor so that the image is centered on the stage
  var start_btn = this.add.button(this.world.centerX,this.world.centerY+100,'start',this.OnClick,this);
  start_btn.anchor.setTo(0.5,0.5);
  this.music = this.add.audio("music",1,true);
  this.music.play();
};

MenuState.prototype.update = function() {

};


MenuState.prototype.OnClick = function(){
  this.state.start('level_one');
  this.music.stop();
};
