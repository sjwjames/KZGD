/**
 * Created by sjwjames on 16/3/14.
 */

var MenuUI = cc.Layer.extend({
    ctor:function(){
        this._super();
        var bg=new cc.Sprite(res.startBg);
        bg.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
        this.addChild(bg,1);
        cc.spriteFrameCache.addSpriteFrames(res.uiPlist);
        this.startBtn=new cc.MenuItemImage("#startBtn.png","#startBtn.png",this._startGame,this);
        this.rankBtn=new cc.MenuItemImage("#rankBlack.png","#rankBlack.png",this._openRank,this);
        this.menu=new cc.Menu(this.startBtn,this.rankBtn);
        this.menu.setPosition(cc.p(cc.winSize.width*UIConstants.menuUI.menuP_x_percent,cc.winSize.height*UIConstants.menuUI.menuP_y_percent));
        this.menu.alignItemsHorizontally();
        this.addChild(this.menu,2);

    },

    _startGame: function () {
        GameStats.refresh();
        cc.director.runScene(new GameScene());
        return true;
    },
    _openRank: function () {
        this.removeChild(this.menu);
        var rankUI=new RankUI();
        this.addChild(rankUI,3);
    }
});