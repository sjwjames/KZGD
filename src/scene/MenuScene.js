/**
 * Created by sjwjames on 16/3/14.
 */
var MenuScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        var menuUI = new MenuUI();
        this.addChild(menuUI,1);
    },
    onEnter:function () {
        this._super();
        cc.director.resume();
        kzgd.showOrientationTip();
    }
});