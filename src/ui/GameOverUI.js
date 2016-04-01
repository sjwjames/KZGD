/**
 * Created by sjwjames on 16/3/14.
 */
var GameOverUI = cc.Layer.extend({
    ctor: function () {
        this._super();
        var bg=new cc.LayerColor(cc.color(0,0,0,126),cc.director.getVisibleSize().width,cc.director.getVisibleSize().height);
        this.addChild(bg,1);
        var gradeText=new cc.Sprite("#overText.png");
        gradeText.setPosition(cc.p(cc.director.getVisibleSize().width/2,cc.director.getVisibleSize().height/4*3));
        this.addChild(gradeText,2);
        var grade=new cc.LabelTTF(GameStats.currentGrade+"","Arial",30,cc.size(100,50),cc.TEXT_ALIGNMENT_CENTER,cc.TEXT_ALIGNMENT_CENTER);
        grade.setPosition(cc.p(cc.director.getVisibleSize().width/2+95,cc.director.getVisibleSize().height/4*3-34));
        this.addChild(grade,2);
        var retryBtn=new cc.MenuItemImage("#retry.png","#retry.png",this.onRetry,this);
        var quitBtn=new cc.MenuItemImage("#quit.png","#quit.png",this.onQuit,this);
        var shareBtn=new cc.MenuItemImage("#invite.png","#invite.png",this.onShare,this);
        var menu=new cc.Menu(retryBtn,quitBtn,shareBtn);
        menu.alignItemsVertically();
        menu.setPosition(cc.p(cc.director.getVisibleSize().width/2,cc.director.getVisibleSize().height/3));
        this.addChild(menu,2);
    },
    onRetry: function () {
        GameController.retry();
    },
    onQuit: function () {
        GameController.quit();
    },
    onShare: function () {
        if (!this.shareText){
            this.shareText=new cc.Sprite("#share.png");
            this.shareText.setPosition(cc.p(cc.director.getVisibleSize().width-220,cc.director.getVisibleSize().height/4*3));
            this.addChild(this.shareText,2);
        }

    }

});