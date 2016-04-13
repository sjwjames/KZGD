/**
 * Created by sjwjames on 16/4/11.
 */
var MySlider=cc.ControlSlider.extend({
    ctor: function (bgFile, progressFile, thumbFile,listView) {
        this._super(bgFile, progressFile, thumbFile);
        this.listView=listView;
        this.currentPercent=0;
    },
    sliderBegan: function (location) {
        var percent = 1-(this._value - this._minimumValue) / (this._maximumValue - this._minimumValue);
        if (percent>=0.75){
            percent=1;
        }
        if(percent<=0.25){
            percent=0;
        }
        this.listView.getInnerContainer().setPositionY(percent*(this.listView.height-this.listView.innerHeight));
        this._super(location);
    },
    sliderMoved: function (location) {
        this._super(location);
        var percent =1-(this._value - this._minimumValue) / (this._maximumValue - this._minimumValue);
        this.listView.getInnerContainer().setPositionY(percent*(this.listView.height-this.listView.innerHeight));
    },
    needsLayout:function(){
        this._super();
        var percent = (this._value - this._minimumValue) / (this._maximumValue - this._minimumValue);
        if(percent<0.25){
            percent=0.25;
        }
        if(percent>0.75){
            percent=0.75;
        }
        this._thumbSprite.setPositionX(percent * (this._backgroundSprite.getContentSize().width));
        this._thumbSprite._renderCmd.transform(this._renderCmd);
    }
});