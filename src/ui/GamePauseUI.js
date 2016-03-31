/**
 * Created by sjwjames on 16/3/14.
 */
var GamePauseUI = cc.Layer.extend({
    ctor: function () {
        this._super();
        var bg=new cc.LayerColor(cc.color(0,0,0,125),cc.director.getVisibleSize().width,cc.director.getVisibleSize().height);
        this.addChild(bg,2);
        var pause_text=new cc.Sprite("#pauseText.png");
        pause_text.setPosition(cc.p(cc.director.getVisibleSize().width/2,cc.director.getVisibleSize().height/4*3));
        this.addChild(pause_text,2);
        var resume=new cc.MenuItemImage("#resume.png","#resume.png",this.onResume,this);
        var retry=new cc.MenuItemImage("#retry.png","#retry.png",this.onRetry,this);
        var quit=new cc.MenuItemImage("#quit.png","#quit.png",this.onQuit,this);
        var menu=new cc.Menu(resume,retry,quit);
        menu.setPosition(cc.p(cc.director.getVisibleSize().width/2,cc.director.getVisibleSize().height/2-50));
        menu.alignItemsVerticallyWithPadding(10);
        this.addChild(menu,2);
    },
    onRetry: function (event) {
       GameController.retry();
    },
    onResume: function (event) {
       GameController.resume();
    },
    onQuit: function (event) {
        GameController.quit();
    }
});