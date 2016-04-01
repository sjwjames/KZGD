/**
 * Created by sjwjames on 16/3/14.
 */
var Hero = cc.Sprite.extend({
    ctor: function (imgURL) {
        this._super(imgURL);
        this.heroIdleAnimation=new cc.Animation();
        for (var i=0;i<heroIdlePics.length;i++){
            this.heroIdleAnimation.addSpriteFrameWithFile(heroIdlePics[i]);
        }
        this.heroIdleAnimation.setDelayPerUnit(1/heroIdlePics.length);
        this.idleAction = cc.animate(this.heroIdleAnimation);
        this.idleAction.repeatForever();
        this.runAction(this.idleAction);

    },

    defence: function (event) {
        this.stopAction(this.idleAction);
        var myData=event.getUserData();
        var heroDefenceAnimation=new cc.Animation();
        for (var i=0;i<defencePics.length;i++){
            heroDefenceAnimation.addSpriteFrameWithFile(defencePics[i]);
        }
        heroDefenceAnimation.setDelayPerUnit(1/defencePics.length);
        var defenceAction = cc.animate(heroDefenceAnimation);
        var reverse=defenceAction.clone().reverse();
        var callFunc=cc.callFunc(this.defenceBackToIdle,this,myData);
        var sequence=cc.sequence(defenceAction,reverse,callFunc);
        this.runAction(sequence);
    },
    defenceBackToIdle: function () {
        var noEnemy=arguments[1].noEnemyAttack;
        if (noEnemy){
            this.runAction(this.idleAction);
        }else{
            this.attack();
        }
        HeroController.idle();

    },
    onEnter: function () {
        this._super();
        cc.eventManager.addCustomListener("heroAttack",this.attack.bind(this));
        cc.eventManager.addCustomListener("heroDefence",this.defence.bind(this));
        cc.eventManager.addCustomListener("failDefence",this.failDefence.bind(this));
    },

    attack: function () {
        //动画

        HeroController.attack();
        this.runAction(this.idleAction);
    },
    failDefence: function (event) {
        this.stopAction(this.idleAction);
        var heroHurtAnimation=new cc.Animation();
        for (var i=0;i<defenceFailurePics.length;i++){
            heroHurtAnimation.addSpriteFrameWithFile(defenceFailurePics[i]);
        }
        heroHurtAnimation.setDelayPerUnit(1/defenceFailurePics.length);
        var hurtAction=cc.animate(heroHurtAnimation);
        var hurtCallFunc=cc.callFunc(this.failBackToIdle,this);
        var sequence=cc.sequence(hurtAction,hurtCallFunc);
        if(GameStats.currentHealth==0){
            var dieCallFunc=cc.callFunc(this.goDie,this);
            sequence=cc.sequence(hurtAction,dieCallFunc);
        }
        this.runAction(sequence);
    },
    failBackToIdle: function () {
        this.runAction(this.idleAction);
        HeroController.idle();
    },
    goDie: function () {
        var dieAnimation=new cc.Animation();
        for (var i=0;i<diePics.length;i++){
            dieAnimation.addSpriteFrameWithFile(diePics[i]);
        }
        dieAnimation.setDelayPerUnit(1/diePics.length);
        var dieAction=cc.animate(dieAnimation);
        var callFunc=cc.callFunc(this.onDie,this);
        var sequence=cc.sequence(dieAction,callFunc);
        this.runAction(sequence);
    },
    onDie: function () {
        cc.eventManager.dispatchCustomEvent("myGameOver");
    }
    ,
    onExit: function () {
        this._super();
        cc.eventManager.removeCustomListeners("heroAttack");
        cc.eventManager.removeCustomListeners("heroDefence");
        cc.eventManager.removeCustomListeners("failDefence");
    }

});