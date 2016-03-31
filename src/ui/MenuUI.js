/**
 * Created by sjwjames on 16/3/14.
 */

var MenuUI = cc.Layer.extend({
    ctor:function(){
        this._super();
        var bg=new cc.Sprite(res.startBg);
        bg.setPosition(cc.p(cc.director.getVisibleSize().width/2,cc.director.getVisibleSize().height/2));
        this.addChild(bg);
        cc.spriteFrameCache.addSpriteFrames(res.uiPlist);
        var startBtn=new cc.MenuItemImage("#startBtn.png","#startBtn.png",this._startGame.bind(this));
        var menu=new cc.Menu();
        menu.addChild(startBtn);
        menu.setPosition(cc.p(cc.director.getVisibleSize().width*UIConstants.menuUI.menuP_x_percent,cc.director.getVisibleSize().height*UIConstants.menuUI.menuP_y_percent));
        this.addChild(menu);

    },

    _startGame: function () {
        cc.director.runScene(new GameScene());
        return true;
    }
});