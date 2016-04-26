/**
 * Created by sjwjames on 16/3/14.
 */
var Enemy = cc.Sprite.extend({
    walkTime:Constants.walkTime,
    harm:Constants.enemyHarm,
    state:Constants.enemyState.idle,
    type:0,
    wave:0,
    attackTime:GameStats.currentAttackTime,
    attackInterval:Constants.attackInterval,
    mySchedule:null,
    ctor:function(imgURL,wav){
        this._super(imgURL);
        this.wave=wav;
        this.type=this.wave%Constants.enemyTypes;
        this.harm+=this.wave;
        this.mySchedule=new MySchedule();
        this.mySchedule.mySchedule(this.onAttackAnimated,GameStats.currentAttackTime/Constants.enemyAttackFrames,this);
    },
    walk: function () {
        //var time=(cc.winSize.width-(UIConstants.fightLayer.hero_x+this.width*GameStats.currentEnemyNumber-100))/((cc.winSize.width-(UIConstants.fightLayer.hero_x+this.width-100))/this.walkTime);
        var time=this.walkTime;
        var walkAction=cc.moveTo(time,cc.p(UIConstants.fightLayer.hero_x+300*GameStats.currentEnemyNumber-100,cc.winSize.height/UIConstants.fightLayer.enemy_y_per));
        var callFunc=cc.callFunc(this.stop,this);
        var sequence = cc.sequence(walkAction,callFunc);
        this.runAction(sequence);
        this.state=Constants.enemyState.walk;
    },
    stop: function () {
        this.stopAllActions();
        this.state=Constants.enemyState.stop;
        this.scheduleOnce(this.attack.bind(this),Constants.stopInterval);
    },
    attack: function () {
        this.state=Constants.enemyState.attack;
        //播放攻击动画
        var animation = new cc.Animation();
        for (var i=1;i<=enemy0.length;i++){
            animation.addSpriteFrameWithFile("res/enemy/enemy"+(this.type)+"/g"+i+".png");
        }
        animation.setDelayPerUnit(this.attackTime/enemy0.length);
        this.animationAction = cc.animate(animation);
        var onAttackAction=cc.callFunc(this.unattack,this);
        var sequence=cc.sequence(this.animationAction,onAttackAction);
        this.runAction(sequence);

    },
    unattack: function () {
        //判断是否造成伤害
        this.state=Constants.enemyState.idle;
        this.scheduleOnce(this.attack.bind(this),Constants.attackInterval);
    },
    goDie: function () {
        this.state=Constants.enemyState.die;
        GameStats.currentGrade++;
        if(!GameStats.hasEntered){
            GameStats.hasEntered=true;
            cc.sys.localStorage.setItem("entered",true);
        }
    },
    reuse: function (wave) {
        this.wave=wave;
    },
    unuse: function () {

    },
    onAttackAnimated: function () {
        if(this.animationAction){
            if (this.animationAction.getCurrentFrameIndex()<=5){
                this.state=Constants.enemyState.attacking;
                if(!GameStats.hasEntered){
                    cc.eventManager.dispatchCustomEvent("firstAttack");
                }

            }else{
                this.state=Constants.enemyState.attack;
                if(GameStats.currentHeroState==Constants.heroState.idle){
                    EnemyController.doHarm(this.harm);
                }
            }


        }

    },
    onExit: function () {
        this._super();

    }
});