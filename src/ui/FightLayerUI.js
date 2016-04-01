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
            var listener=ListenerFactory.getTouchListener(this.onDefence.bind(this));
            cc.eventManager.addListener(listener,this);
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
    },

    onDefence: function (touch,event) {
        if (OnTouch.withInReach(touch,event)){
            HeroController.defence(this.enemyList);
        }
    },

    eliminateEnemy: function () {
        console.log(this.enemyList.length);
        for (var i=0;i<this.enemyList.length;i++){
            this.enemyList[i].goDie();
            this.removeChild(this.enemyList[i]);
        }
        this.enemyList=[];
        GameStats.currentEnemyNumber=0;
    },

    generateEnemy: function () {
        if(GameStats.currentEnemyNumber<4){
            var enemy=EnemyController.generateEnemy();
            this.enemyList.push(enemy);
            this._addEnemy(enemy);
        }

    },
    _addEnemy: function (enemy) {
        enemy.setPosition(cc.p(cc.director.getVisibleSize().width,cc.director.getVisibleSize().height/UIConstants.fightLayer.enemy_y_per));
        this.addChild(enemy,2);
        GameStats.currentEnemyNumber++;
        enemy.walk();
    },
    _resetSchedule: function () {
        GameStats.currentWaveInterval=Math.pow(GameStats.currentWaveInterval,0.9);
        this.unschedule(this.generateEnemy);
        this.mySchedule.mySchedule(this.generateEnemy,GameStats.currentWaveInterval,this);
    },
    onExit: function () {
        this._super();
        cc.eventManager.removeCustomListeners("eliminateEnemy");
        cc.eventManager.removeCustomListeners("accelerateWave");
        this.enemyList=[];
    }
});