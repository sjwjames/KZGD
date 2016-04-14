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
    if (GameStats.currentHeroState==Constants.heroState.idle){
        HeroController.getHurt(harm);
    }else if(GameStats.currentHeroState==Constants.heroState.defence){
        GameStats.unResponsedAttack=true;
        GameStats.unResponsedHarm=harm;
    }
}