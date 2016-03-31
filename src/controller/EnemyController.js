/**
 * Created by sjwjames on 16/3/15.
 */
var EnemyController=cc.Class.extend({
    ctor: function () {
        
    },
});

EnemyController.generateEnemy= function () {

    if(cc.pool.hasObject(Enemy)){
        console.log("from pool");
        return cc.pool._getFromPool(Enemy);
    }else{
        var wave=GameStats.currentWave;
        var type=wave%Constants.enemyTypes;
        var imgURL="res/enemy/enemy"+(type)+".png";
        GameStats.currentWave+=1;
        if(GameStats.currentWave%10==0){
            cc.eventManager.dispatchCustomEvent("accelerateWave");
        }
        return new Enemy(imgURL,wave);
    }
};

EnemyController.doHarm=function(harm){
    if (GameStats.currentHeroState==Constants.heroState.defence||GameStats.currentHeroState==Constants.heroState.attack){
        console.log("no harm");
        return false;
    }else{
        GameStats.currentHeroState=Constants.heroState.fail;
        GameStats.currentHealth-=harm;
        if (GameStats.currentHealth<0){
            GameStats.currentHealth=0;
            GameController.over();
        }
        cc.eventManager.dispatchCustomEvent("failDefence",{"harm":harm});
        return true;
    }
}