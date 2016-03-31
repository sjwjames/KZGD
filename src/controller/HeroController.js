/**
 * Created by sjwjames on 16/3/14.
 */
var HeroController=cc.Class.extend({
    ctor: function () {

    }
    
});

HeroController.defence=function (enemyList) {
    if (GameStats.currentHeroState==Constants.heroState.idle){
        GameStats.currentHeroState=Constants.heroState.defence;
        var noEnemyAttack=true;
        for (var i=0;i<enemyList.length;i++){
            if (enemyList[i].state==Constants.enemyState.attack){
                noEnemyAttack=false;
                break;
            }
        }
        cc.eventManager.dispatchCustomEvent("heroDefence",{"noEnemyAttack":noEnemyAttack});
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