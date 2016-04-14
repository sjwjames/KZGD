/**
 * Created by sjwjames on 16/3/14.
 */
var GameStats={
    currentState:1,
    currentWave:0,
    currentHeroState:Constants.heroState.idle,
    currentHealth:100,
    frameRate:60,
    currentWaveInterval:4,
    currentEnemyNumber:0,
    currentGrade:0,
    unResponsedAttack:false,
    unResponsedHarm:0,
    currentAttackTime:Constants.attackTime,
    hasEntered:false
};

GameStats.refresh= function () {
        GameStats.currentState=1;
        GameStats.currentWave=0;
        GameStats.currentHeroState=Constants.heroState.idle;
        GameStats.currentHealth=100;
        GameStats.frameRate=60;
        GameStats.currentWaveInterval=8;
        GameStats.currentEnemyNumber=0;
        GameStats.currentGrade=0;
        GameStats.unResponsedAttack=false;
        GameStats.currentAttackTime=Constants.attackTime;
        GameStats.hasEntered=false;
        GameStats.unResponsedHarm=0;
};