/**
 * Created by sjwjames on 16/3/14.
 */
var HeroController=cc.Class.extend({
    ctor: function () {

    }
    
});

HeroController.defence=function (enemyList) {
    console.log(GameStats.currentHeroState);
    if (GameStats.currentHeroState==Constants.heroState.idle){
        GameStats.currentHeroState=Constants.heroState.defence;
        //var noEnemyAttack=true;
        for (var i=0;i<enemyList.length;i++){
            console.log(enemyList[i].state);
            if (enemyList[i].state==Constants.enemyState.attacking){
                //noEnemyAttack=false;
                GameStats.currentHeroState=Constants.heroState.success;
                break;
            }
        }
        cc.eventManager.dispatchCustomEvent("heroDefence");
    }else{
        console.log("not prepared to defend "+GameStats.currentHeroState);
    }
};
HeroController.attack=function () {
    GameStats.currentHeroState=Constants.heroState.attack;
    cc.eventManager.dispatchCustomEvent("eliminateEnemy");
};

HeroController.idle= function () {
    GameStats.currentHeroState=Constants.heroState.idle;
};

HeroController.getHurt= function (harm) {
    GameStats.currentHeroState=Constants.heroState.fail;
    GameStats.currentHealth-=harm;
    if (GameStats.currentHealth<0){
        GameStats.currentHealth=0;
    }
    cc.eventManager.dispatchCustomEvent("getHurt",{"harm":harm});
};