var MenuState = function () {};

MenuState.prototype.preload = function() {
  this.load.image('logo','assets/img/logo.png');
  this.load.image('start','assets/img/start.jpeg');
};

MenuState.prototype.create = function() {
  var logo =   this.add.sprite(this.world.centerX,this.world.centerY,'logo');
  logo.anchor.setTo(0.5,0.5);//set the anchor so that the image is centered on the stage
  var start_btn = this.add.button(this.world.centerX,this.world.centerY+200,'start',this.OnClick,this);
  start_btn.anchor.setTo(0.5,0.5);
};

MenuState.prototype.update = function() {

};


MenuState.prototype.OnClick = function(){
  console.log("Start Level 1 State");
};
