/**
 * Created by sjwjames on 16/3/14.
 */
var GameOverUI = cc.Layer.extend({
    ctor: function () {
        this._super();
        var overText=new cc.MenuItemFont("Over",this._startAgain,this);
        var menu=new cc.Menu();
        menu.addChild(overText);
        menu.x=500;
        menu.y=500;
        this.addChild(menu);
    },
    _startAgain: function () {

    }

});