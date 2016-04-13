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
    },
    walk: function () {
        var time=(cc.director.getVisibleSize().width-(UIConstants.fightLayer.hero_x+this.width*GameStats.currentEnemyNumber))/((cc.director.getVisibleSize().width-(UIConstants.fightLayer.hero_x+this.width))/this.walkTime);
        var walkAction=cc.moveTo(time,cc.p(UIConstants.fightLayer.hero_x+this.width*GameStats.currentEnemyNumber,cc.director.getVisibleSize().height/UIConstants.fightLayer.enemy_y_per));
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
        for (var i=0;i<enemy0.length;i++){
            //animation.addSpriteFrameWithFile("res/enemy/enemy"+(this.type)+"/g"+i+".png");
            animation.addSpriteFrameWithFile(enemy0[i]);
        }
        animation.setDelayPerUnit(this.attackTime/enemy0.length);
        var animationAction = cc.animate(animation);
        var onAttackAction=cc.callFunc(this.unattack,this);
        var sequence=cc.sequence(animationAction,onAttackAction);
        this.runAction(sequence);
        if(!GameStats.hasEntered){
            this.scheduleOnce(function () {
                cc.eventManager.dispatchCustomEvent("firstAttack");
            }.bind(this),this.attackTime/enemy0.length*2);
        }
    },
    unattack: function () {
        //判断是否造成伤害
        EnemyController.doHarm(this.harm);
        this.state=Constants.enemyState.idle;
        this.scheduleOnce(this.attack.bind(this),this.attackInterval);
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

    }
});