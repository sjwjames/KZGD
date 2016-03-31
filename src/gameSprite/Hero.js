/**
 * Created by sjwjames on 16/3/14.
 */
var Hero = cc.Sprite.extend({
    ctor: function (imgURL) {
        this._super(imgURL);
        this.heroIdleAnimation=new cc.Animation();
        for (var i=0;i<heroIdle.length;i++){
            this.heroIdleAnimation.addSpriteFrameWithFile(heroIdle[i]);
        }
        this.heroIdleAnimation.setDelayPerUnit(1/heroIdle.length);
        this.idleAction = cc.animate(this.heroIdleAnimation);
        this.idleAction.repeatForever();
        this.runAction(this.idleAction);
        cc.eventManager.addCustomListener("heroAttack",this.attack.bind(this));
        cc.eventManager.addCustomListener("heroDefence",this.defence.bind(this));
        cc.eventManager.addCustomListener("failDefence",this.failDefence.bind(this));
    },

    defence: function (event) {
        this.stopAction(this.idleAction);
        var myData=event.getUserData();
        var heroDefenceAnimation=new cc.Animation();
        for (var i=0;i<defence.length;i++){
            heroDefenceAnimation.addSpriteFrameWithFile(defence[i]);
        }
        heroDefenceAnimation.setDelayPerUnit(1/defence.length);
        var defenceAction = cc.animate(heroDefenceAnimation);
        var reverse=defenceAction.clone().reverse();
        var callFunc=cc.callFunc(this.backToIdle,this,myData);
        var sequence=cc.sequence(defenceAction,reverse,callFunc);
        this.runAction(sequence);
    },
    backToIdle: function () {
        var noEnemy=arguments[1].noEnemyAttack;
        if (noEnemy){
            this.runAction(this.idleAction);
        }else{
            this.attack();
        }
        HeroController.idle();

    },

    attack: function () {
        //动画

        HeroController.attack();
        this.runAction(this.idleAction);
    },
    failDefence: function (event) {
        if(this.idleAction){
            this.stopAction(this.idleAction);
        }
        console.log("get hurt");
        //animation
        HeroController.idle();
    },
    goDie: function () {
        
    }


});