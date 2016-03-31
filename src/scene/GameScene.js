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
      cc.eventManager.addCustomListener("myGameOver",this.gameOver.bind(this));
      cc.eventManager.addCustomListener("myGamePaused",this.gamePaused.bind(this));
      cc.eventManager.addCustomListener("myGameResumed",this.gameResumed.bind(this));
      cc.eventManager.addCustomListener("myGameRetried",this.gameRetried.bind(this));
    },
    onEnter:function(){
        this._super();
    },
    gamePaused: function (event) {
        this.removeChild(this.gameUI,true);
        this.pauseUI=new GamePauseUI();
        this.addChild(this.pauseUI,3);
        cc.director.pause();
        return true;
    },
    gameResumed: function (event) {
        console.log("2");
        this.removeChild(this.pauseUI,true);
        this.gameUI=new GameUI();
        this.addChild(this.gameUI,3);
        cc.director.resume();
    },
    gameRetried: function (event) {
        GameStats.refresh();
        cc.director.runScene(new GameScene());
        cc.director.resume();
        return true;
    },
    gameOver: function (event) {
        var gameOverUI=new GameOverUI();
        this.removeAllChildren();
        this.addChild(gameOverUI);
    }
});