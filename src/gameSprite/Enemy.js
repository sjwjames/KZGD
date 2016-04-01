/**
 * Created by sjwjames on 16/3/14.
 */
var Enemy = cc.Sprite.extend({
    walkTime:Constants.walkTime,
    harm:Constants.enemyHarm,
    state:Constants.enemyState.idle,
    type:0,
    wave:0,
    attackTime:Constants.attackTime,
    attackInterval:Constants.attackInterval,
    mySchedule:null,
    ctor:function(imgURL,wav){
        this._super(imgURL);
        this.wave=wav;
        this.type=this.wave%Constants.enemyTypes;
        this.harm+=this.wave;
        this.attackTime*=Constants.enemyAttackAccRate;
        this.mySchedule=new MySchedule();
    },
    walk: function () {
        var animation = new cc.Animation();
        for (var i=0;i<Constants.enemyAnimationFrames;i++){
            animation.addSpriteFrameWithFile("res/enemy/enemy"+(this.type)+".png");
        }
        animation.setDelayPerUnit(1/Constants.enemyAnimationFrames);
        animation.setLoops(Constants.enemyAnimationLoop);
        var animationAction = cc.animate(animation);
        var time=(cc.director.getVisibleSize().width-(UIConstants.fightLayer.hero_x+this.width*GameStats.currentEnemyNumber))/((cc.director.getVisibleSize().width-(UIConstants.fightLayer.hero_x+this.width))/this.walkTime);
        var walkAction=cc.moveTo(time,cc.p(UIConstants.fightLayer.hero_x+this.width*GameStats.currentEnemyNumber,cc.director.getVisibleSize().height/UIConstants.fightLayer.enemy_y_per));
        var callFunc=cc.callFunc(this.stop,this);
        var sequence = cc.sequence(walkAction,callFunc);
        this.runAction(cc.spawn(animationAction,sequence));
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
        this.scheduleOnce(this.unattack.bind(this),this.attackTime);
    },
    unattack: function () {
        //判断是否造成伤害
        EnemyController.doHarm(this.harm);
        //播放攻击后摇动作
        this.state=Constants.enemyState.idle;
        this.scheduleOnce(this.attack.bind(this),this.attackInterval);
    },
    goDie: function () {
        this.state=Constants.enemyState.die;
        GameStats.currentGrade++;
    },
    reuse: function (wave) {
        this.wave=wave;
    },
    unuse: function () {

    }
});