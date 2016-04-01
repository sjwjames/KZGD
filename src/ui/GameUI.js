/**
 * Created by sjwjames on 16/3/14.
 */
var GameUI = cc.Layer.extend({
   ctor: function () {
      this._super();
      var healthBar=new cc.Sprite("#healthBar.png");
      healthBar.setPosition(cc.p(cc.director.getVisibleSize().width/3,cc.director.getVisibleSize().height/7*6));
      this.addChild(healthBar,2);
      var health=new cc.Sprite("#healthBg.png");
      health.setPosition(cc.p(cc.director.getVisibleSize().width/3+80,cc.director.getVisibleSize().height/7*6-10));
      this.addChild(health,3);
      this.healthIndex=new cc.LayerColor(cc.color(206,48,52),217*(GameStats.currentHealth/Constants.heroHealth),14);
      this.healthIndex_left=new cc.Sprite("#heathBarLeft.png");
      this.healthIndex_right=new cc.Sprite("#healthBarRight.png");
      this.healthIndex.setPosition(cc.p(cc.director.getVisibleSize().width/3-28,cc.director.getVisibleSize().height/7*6-17));
      this.healthIndex_left.setPosition(cc.p(cc.director.getVisibleSize().width/3-34,cc.director.getVisibleSize().height/7*6-10));
      this.healthIndex_right.setPosition(cc.p(this.healthIndex.x+this.healthIndex.width+6,cc.director.getVisibleSize().height/7*6-10));
      this.addChild(this.healthIndex,4);
      this.addChild(this.healthIndex_left,4);
      this.addChild(this.healthIndex_right,4);
      if (GameStats.currentHealth==0){
         this.healthIndex.width=0;
         this.healthIndex_left.visible=false;
         this.healthIndex_right.visible=false;
      }
      var pause=new cc.Sprite("#pause.png");
      pause.setPosition(cc.p(cc.director.getVisibleSize().width-pause.width-100,cc.director.getVisibleSize().height/7*6));
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
         this.healthIndex_right.setPosition(cc.p(this.healthIndex.x+this.healthIndex.width+6,cc.director.getVisibleSize().height/7*6-10));
      }
      cc.eventManager.dispatchCustomEvent("failDefence");

   },
   onExit: function () {
      this._super();
      cc.eventManager.removeCustomListeners("getHurt");
   }


});