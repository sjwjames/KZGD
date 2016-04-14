/**
 * Created by sjwjames on 16/3/14.
 */
var GameUI = cc.Layer.extend({
   ctor: function () {
      this._super();
      var healthBar=new cc.Sprite("#healthBar.png");
      healthBar.setPosition(cc.p(cc.winSize.width/3,cc.winSize.height/7*6));
      this.addChild(healthBar,2);
      var health=new cc.Sprite("#healthBg.png");
      health.setPosition(cc.p(cc.winSize.width/3+80,cc.winSize.height/7*6-10));
      this.addChild(health,3);
      this.healthIndex=new cc.LayerColor(cc.color(206,48,52),217*(GameStats.currentHealth/Constants.heroHealth),14);
      this.healthIndex_left=new cc.Sprite("#heathBarLeft.png");
      this.healthIndex_right=new cc.Sprite("#healthBarRight.png");
      this.healthIndex.setPosition(cc.p(cc.winSize.width/3-28,cc.winSize.height/7*6-17));
      this.healthIndex_left.setPosition(cc.p(this.healthIndex.x-this.healthIndex_left.width/2,this.healthIndex.y+this.healthIndex_left.height/2));
      this.healthIndex_right.setPosition(cc.p(this.healthIndex.x+this.healthIndex.width+this.healthIndex_right.width/2-0.5,this.healthIndex.y+this.healthIndex_right.height/2));
      this.addChild(this.healthIndex,4);
      this.addChild(this.healthIndex_left,4);
      this.addChild(this.healthIndex_right,4);
      if (GameStats.currentHealth==0){
         this.healthIndex.width=0;
         this.healthIndex_left.visible=false;
         this.healthIndex_right.visible=false;
      }
      var pause=new cc.Sprite("#pause.png");
      pause.setPosition(cc.p(cc.winSize.width-pause.width,cc.winSize.height/7*6));
      this.addChild(pause,2);
      try{
         var listener=ListenerFactory.getTouchListener(this.onPause.bind(this));
         cc.eventManager.addListener(listener,pause);
      }catch (ex){
         console.log(ex.message);
      }
   },
   onEnter: function () {
      this._super();
      cc.eventManager.addCustomListener("getHurt",this._getHurt.bind(this));
   },

   onPause: function (touch,event) {
      if(OnTouch.withInReach(touch,event)){
        GameController.pause();
      }
   },
   _getHurt: function (event) {
      if (GameStats.currentHealth==0){
         this.healthIndex.width=0;
         this.healthIndex_left.visible=false;
         this.healthIndex_right.visible=false;
      }else{
         this.healthIndex.width*=(GameStats.currentHealth/Constants.heroHealth);
         this.healthIndex_right.x=this.healthIndex.x+this.healthIndex.width+this.healthIndex_right.width/2-0.5;
      }

   },
   onExit: function () {
      this._super();
      cc.eventManager.removeCustomListeners("getHurt");
   }


});