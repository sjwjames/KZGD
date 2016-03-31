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
      this.healthIndex=new cc.LayerColor(cc.color(206,48,52),220,14);
      this.healthIndex_left=new cc.Sprite("#heathBarLeft.png");
      this.healthIndex_right=new cc.Sprite("#healthBarRight.png");
      this.healthIndex.setPosition(cc.p((cc.director.getVisibleSize().width/3-28)*(GameStats.currentHealth/Constants.heroHealth),cc.director.getVisibleSize().height/7*6-17));
      this.healthIndex_left.setPosition(cc.p(cc.director.getVisibleSize().width/3-35,cc.director.getVisibleSize().height/7*6-10));
      this.healthIndex_right.setPosition(cc.p((cc.director.getVisibleSize().width/2)*(GameStats.currentHealth/Constants.heroHealth)+9,cc.director.getVisibleSize().height/7*6-10));
      this.addChild(this.healthIndex,4);
      this.addChild(this.healthIndex_left,4);
      this.addChild(this.healthIndex_right,4);
      var pause=new cc.Sprite("#pause.png");
      pause.setPosition(cc.p(cc.director.getVisibleSize().width-pause.width-100,cc.director.getVisibleSize().height/7*6));
      this.addChild(pause,2);
      try{
         var listener=ListenerFactory.getTouchListener(this.onPause.bind(this));
         cc.eventManager.addListener(listener,pause);
      }catch (ex){
         console.log(ex.message);
      }
      cc.eventManager.addCustomListener("failDefence",this._getHurt.bind(this));
   },


   onPause: function (touch,event) {
      if(OnTouch.withInReach(touch,event)){
        GameController.pause();
      }


   },
   _getHurt: function (event) {

   }

});