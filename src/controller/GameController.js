/**
 * Created by sjwjames on 16/3/14.
 */
var GameController=cc.Class.extend({
    ctor: function () {

    }

});


GameController.pause= function () {
    cc.eventManager.dispatchCustomEvent("myGamePaused");
};
GameController.retry= function () {
    cc.eventManager.dispatchCustomEvent("myGameRetried");
};
GameController.resume=function () {
    cc.eventManager.dispatchCustomEvent("myGameResumed");
};
GameController.quit= function () {
    cc.director.runScene(new MenuScene());
    return true;
};
GameController.over= function () {
    //触发事件
    cc.eventManager.dispatchCustomEvent("myGameOver");
};



