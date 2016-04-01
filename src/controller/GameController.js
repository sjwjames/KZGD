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
    GameStats.refresh();
    cc.director.resume();
    cc.director.runScene(new GameScene());
    return true;
};
GameController.resume=function () {
    cc.eventManager.dispatchCustomEvent("myGameResumed");
};
GameController.quit= function () {
    GameStats.refresh();
    cc.director.resume();
    cc.director.runScene(new MenuScene());
    return true;
};
GameController.over= function () {
    //触发事件
    GameStats.currentHeroState=Constants.heroState.die;
    cc.eventManager.dispatchCustomEvent("goDie");
};



