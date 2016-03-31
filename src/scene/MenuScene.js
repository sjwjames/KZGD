/**
 * Created by sjwjames on 16/3/14.
 */
var MenuScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        var menuUI = new MenuUI();
        this.addChild(menuUI);
    },
    onEnter:function () {
        this._super();
    }
});