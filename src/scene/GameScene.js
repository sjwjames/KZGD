/**
 * Created by sjwjames on 16/3/14.
 */
var GameScene = cc.Scene.extend({
    ctor:function(){
      this._super();
      var bg=new cc.Sprite(res.gameBg);
      bg.setPosition(cc.p(cc.director.getVisibleSize().width/2,cc.director.getVisibleSize().height/2));
      this.addChild(bg,1);
      this.gameUI=new GameUI();
      this.fightLayer=new FightLayerUI();
      this.addChild(this.gameUI,3);
      this.addChild(this.fightLayer,2);
    },
    onEnter:function(){
        this._super();
        cc.eventManager.addCustomListener("myGameOver",this.onGameOver.bind(this));
        cc.eventManager.addCustomListener("myGamePaused",this.onGamePaused.bind(this));
        cc.eventManager.addCustomListener("myGameResumed",this.onGameResumed.bind(this));
    },
    onGamePaused: function (event) {
        this.removeChild(this.gameUI,true);
        this.pauseUI=new GamePauseUI();
        this.addChild(this.pauseUI,3);
        cc.director.pause();
        return true;
    },
    onGameResumed: function (event) {
        this.removeChild(this.pauseUI,true);
        this.gameUI=new GameUI();
        this.addChild(this.gameUI,3);
        cc.director.resume();
    },
    onGameOver: function (event) {
        this.removeChild(this.gameUI,true);
        var gameOverUI=new GameOverUI();
        this.addChild(gameOverUI,3);
        cc.director.pause();
    },
    onExit: function () {
        this._super();
        cc.eventManager.removeCustomListeners("myGameOver");
        cc.eventManager.removeCustomListeners("myGamePaused");
        cc.eventManager.removeCustomListeners("myGameResumed");
    }
});