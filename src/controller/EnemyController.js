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
        //var type=wave%Constants.enemyTypes;
        var type=0;
        var imgURL="res/enemy/enemy"+(type)+"/g1.png";
        GameStats.currentWave+=1;
        if(GameStats.currentWave%10==0){
            GameStats.currentWaveInterval=Math.pow(GameStats.currentWaveInterval,0.9);
            GameStats.currentAttackTime=Math.pow(GameStats.currentAttackTime,Constants.enemyAttackAccRate);
            cc.eventManager.dispatchCustomEvent("accelerateWave");
        }
        return new Enemy(imgURL,wave);
    }
};

EnemyController.doHarm=function(harm){
    if (GameStats.currentHeroState!=Constants.heroState.idle){
        if(GameStats.currentHeroState==Constants.heroState.defence){
            GameStats.unResponsedAttack=true;
        }
        return false;
    }else{
        GameStats.currentHeroState=Constants.heroState.fail;
        GameStats.currentHealth-=harm;
        if (GameStats.currentHealth<0){
            GameStats.currentHealth=0;
        }
        cc.eventManager.dispatchCustomEvent("getHurt",{"harm":harm});
        return true;
    }
}