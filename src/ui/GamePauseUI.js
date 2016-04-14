/**
 * Created by sjwjames on 16/3/14.
 */
var GamePauseUI = cc.Layer.extend({
    ctor: function () {
        this._super();
        var bg=new cc.LayerColor(cc.color(0,0,0,125),cc.winSize.width,cc.winSize.height);
        this.addChild(bg,1);
        var pause_text=new cc.Sprite("#pauseText.png");
        pause_text.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/4*3));
        this.addChild(pause_text,2);
        var resumeBtn=new cc.Sprite("#resume.png");
        resumeBtn.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2+70));
        this.addChild(resumeBtn,2);
        var retryBtn=new cc.Sprite("#retry.png");
        retryBtn.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2-30));
        this.addChild(retryBtn,2);
        var quitBtn=new cc.Sprite("#quit.png");
        quitBtn.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2-130));
        this.addChild(quitBtn,2);
        try{
            var resumeListener=ListenerFactory.getTouchListener(this.onResume.bind(this));
            cc.eventManager.addListener(resumeListener,resumeBtn);
            var retryListener=ListenerFactory.getTouchListener(this.onRetry.bind(this));
            cc.eventManager.addListener(retryListener,retryBtn);
            var quitListener=ListenerFactory.getTouchListener(this.onQuit.bind(this));
            cc.eventManager.addListener(quitListener,quitBtn);
        }catch (ex){
            console.log(ex.message);
        }
    },
    onRetry: function (touch,event) {
        if (OnTouch.withInReach(touch,event)){
            GameController.retry();
        }

    },
    onResume: function (touch,event) {
       if (OnTouch.withInReach(touch,event)){
           GameController.resume(event);
       }
    },
    onQuit: function (touch,event) {
       if(OnTouch.withInReach(touch,event)){
           GameController.quit();
       }

    }
});