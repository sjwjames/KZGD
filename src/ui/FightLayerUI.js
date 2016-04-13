/**
 * Created by sjwjames on 16/3/14.
 */
var FightLayerUI = cc.Layer.extend({
    hero:null,
    enemyList:null,
    mySchedule:null,
    ctor: function () {
        this._super();
        this.mySchedule=new MySchedule();
        this.hero=new Hero(heroIdlePics[0]);
        this.enemyList=[];
        this.hero.setPosition(cc.p(UIConstants.fightLayer.hero_x,cc.director.getVisibleSize().height/UIConstants.fightLayer.hero_y_per));
        this.addChild(this.hero,2);
        try{
            this.listener=ListenerFactory.getTouchListener(this.onDefence.bind(this));
            cc.eventManager.addListener(this.listener,this);
        }catch (ex){
            console.log(ex.message);
        }
        this.generateEnemy();
        this.mySchedule.mySchedule(this.generateEnemy,GameStats.currentWaveInterval,this);

    },
    onEnter: function () {
        this._super();
        cc.eventManager.addCustomListener("eliminateEnemy",this.eliminateEnemy.bind(this));
        cc.eventManager.addCustomListener("accelerateWave",this._resetSchedule.bind(this));
        cc.eventManager.addCustomListener("firstAttack",this._firstAttack.bind(this));
    },

    onDefence: function (touch,event) {
        if (OnTouch.withInReach(touch,event)){
            var defenceSprite=new cc.Sprite("#defence.png");
            defenceSprite.setPosition(touch.getLocation());
            this.addChild(defenceSprite,2,2);
            var fadeInAction=cc.fadeIn(0.8);
            var fadeOutAction=cc.fadeOut(0.8);
            var sequence=cc.sequence(fadeInAction,fadeOutAction);
            defenceSprite.runAction(sequence);
            var circle=new cc.Sprite("#circle.png");
            circle.setPosition(touch.getLocation());
            circle.scale=0.8;
            this.addChild(circle,2,3);
            var circleFadeIn=cc.fadeIn(0.5);
            var circleFadeOut=cc.fadeOut(0.5);
            var circleScale=cc.scaleTo(0.5,2,2);
            var circleSpawn=cc.spawn(circleFadeOut,circleScale);
            var circleSequence=cc.sequence(circleFadeIn,circleSpawn);
            circle.runAction(circleSequence);
            HeroController.defence(this.enemyList);
        }
    },

    eliminateEnemy: function () {
        var blade=new cc.Sprite("#blade.png");
        blade.setPosition(cc.p(this.hero.x+80,this.hero.y));
        this.addChild(blade);
        var onFlying=new cc.callFunc(function () {
            this.removeChild(blade,true);
        },this);
        var flyMotion=cc.moveTo(0.5,cc.p(cc.director.getVisibleSize().width,this.hero.y));
        var sequence=cc.sequence(flyMotion,onFlying);
        blade.runAction(sequence);
        for (var i=0;i<this.enemyList.length;i++){
            this.enemyList[i].goDie();
            this.removeChild(this.enemyList[i]);
        }
        this.enemyList=[];
        GameStats.currentEnemyNumber=0;
        GameStats.unResponsedAttack=false;
        HeroController.idle();
    },

    generateEnemy: function () {
        if(GameStats.hasEntered){
            if(GameStats.currentEnemyNumber<Constants.maxEnemy){
                var enemy=EnemyController.generateEnemy();
                this.enemyList.push(enemy);
                this._addEnemy(enemy);
            }
        }else{
            if (this.enemyList.length==0){
                var enemy=EnemyController.generateEnemy();
                this.enemyList.push(enemy);
                this._addEnemy(enemy);
            }else{
                return false;
            }
        }

    },
    _addEnemy: function (enemy) {
        enemy.setPosition(cc.p(cc.director.getVisibleSize().width,cc.director.getVisibleSize().height/UIConstants.fightLayer.enemy_y_per));
        this.addChild(enemy,2);
        GameStats.currentEnemyNumber++;
        enemy.walk();
    },
    _resetSchedule: function () {
        this.unschedule(this.generateEnemy);
        this.mySchedule.mySchedule(this.generateEnemy,GameStats.currentWaveInterval,this);
    },
    _firstAttack: function () {
        cc.director.pause();
        cc.eventManager.removeListener(this.listener);
        var hintPanel=new cc.LayerColor(cc.color(0,0,0,126),cc.director.getVisibleSize().width,cc.director.getVisibleSize().height);
        var hint=new cc.LabelTTF("按屏幕任何一处","Arial",15,cc.size(100,50),cc.TEXT_ALIGNMENT_CENTER,cc.TEXT_ALIGNMENT_CENTER);
        hint.setPosition(cc.p(cc.director.getVisibleSize().width/2+40,cc.director.getVisibleSize().height/2));
        //var hintLayer=new cc.LayerColor(cc.color(255,255,255),100,50);
        //hintLayer.setPosition(cc.p(cc.director.getVisibleSize().width/2,cc.director.getVisibleSize().height/2));
        //hintLayer.addChild(hint,2);
        hintPanel.addChild(hint,2);
        this.addChild(hintPanel,3);
        var closePanelListener=ListenerFactory.getTouchListener(function () {
            this.removeChild(hintPanel);
            cc.eventManager.addListener(this.listener,this);
            cc.director.resume();
        }.bind(this));
        cc.eventManager.addListener(closePanelListener,hintPanel);
        //var clippingPanel=new cc.ClippingNode();
        //var stencil=new cc.DrawNode();
        //var enemy=this.enemyList[0];
        //stencil.drawRect(cc.p(enemy.x,enemy.y),cc.p(enemy.x+enemy.width,enemy.y+enemy.height),cc.color(255,255,255,255),0,cc.color(255,255,255,255));
        //clippingPanel.stencil=stencil;
        //this.addChild(clippingPanel,3);
        //hint.runAction(cc.fadeOut(2));
    },
    onExit: function () {
        this._super();
        cc.eventManager.removeCustomListeners("eliminateEnemy");
        cc.eventManager.removeCustomListeners("accelerateWave");
        cc.eventManager.removeCustomListeners("firstStop");
        this.enemyList=[];
    }
});