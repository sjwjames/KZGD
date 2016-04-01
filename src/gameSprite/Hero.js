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
        this.shield=new cc.Sprite("#shield.png");
        this.shield.setPosition(cc.p(UIConstants.fightLayer.hero_x+30,cc.director.getVisibleSize().height/6));
        this.addChild(this.shield,1);
        this.shield.opacity=0;
    },
    onEnter: function () {
        this._super();
        cc.eventManager.addCustomListener("heroAttack",this.attack.bind(this));
        cc.eventManager.addCustomListener("heroDefence",this.defence.bind(this));
        cc.eventManager.addCustomListener("failDefence",this.failDefence.bind(this));
    },
    defence: function (event) {
        this.stopAction(this.idleAction);
        var myData=event.getUserData();
        var heroDefenceAnimation=new cc.Animation();
        for (var i=0;i<defencePics.length;i++){
            heroDefenceAnimation.addSpriteFrameWithFile(defencePics[i]);
        }
        heroDefenceAnimation.setDelayPerUnit(Constants.defenceTime/defencePics.length);
        var defenceAction = cc.animate(heroDefenceAnimation);
        var shieldVisible=cc.callFunc(function () {
            var fadeIn=new cc.fadeIn(0.5);
            this.shield.runAction(fadeIn);
        },this);
        var defenceSpawn=cc.sequence(shieldVisible,defenceAction);
        var reverse=defenceAction.clone().reverse();
        var shieldUnvisible=cc.callFunc(function () {
            this.scheduleOnce(function () {
                var fadeOut=new cc.fadeOut(0.5);
                this.shield.runAction(fadeOut);
            }.bind(this),1);
        },this);
        var revereSpawn=cc.spawn(reverse,shieldUnvisible);
        var callFunc=cc.callFunc(this.defenceBackToIdle,this,myData);
        var sequence=cc.sequence(defenceSpawn,revereSpawn,callFunc);
        this.runAction(sequence);
    },
    defenceBackToIdle: function () {
        var noEnemy=arguments[1].noEnemyAttack;
        if (noEnemy&&(!GameStats.unResponsedAttack)){
            this.runAction(this.idleAction);
            HeroController.idle();
        }else{
            this.attack();
        }
    },

    attack: function () {
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
        if(GameStats.currentHealth==0){
            var dieCallFunc=cc.callFunc(this.goDie,this);
            var  sequence=cc.sequence(hurtAction,dieCallFunc);
            this.runAction(sequence);
        }else{
            var sequence=cc.sequence(hurtAction,hurtCallFunc);
            this.runAction(sequence);
        }

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
        GameStats.currentHeroState=Constants.heroState.die;
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