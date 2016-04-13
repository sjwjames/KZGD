/**
 * Created by sjwjames on 16/4/7.
 */
var RankText=cc.Node.extend({
    ctor: function (num,text) {
        this._super();
        var diText=new cc.LabelTTF("第","Arial",UIConstants.rankText.textSize,cc.size(UIConstants.rankText.textSize,UIConstants.rankText.textSize),cc.TEXT_ALIGNMENT_CENTER,cc.TEXT_ALIGNMENT_CENTER);
        var numText=new cc.LabelTTF(num+"","Arial",UIConstants.rankText.numSize,cc.size(160,UIConstants.rankText.numSize),cc.TEXT_ALIGNMENT_CENTER,cc.TEXT_ALIGNMENT_CENTER);
        var mingText=new cc.LabelTTF(text,"Arial",UIConstants.rankText.textSize,cc.size(UIConstants.rankText.textSize,UIConstants.rankText.textSize),cc.TEXT_ALIGNMENT_CENTER,cc.TEXT_ALIGNMENT_CENTER);
        numText.setDimensions(cc.size(UIConstants.rankText.numSize/2*(numText.string.length+1),UIConstants.rankText.numSize));
        numText.setPosition(cc.p(0-UIConstants.rankText.textSize-UIConstants.rankText.numSize/2*numText.string.length/2,0));
        diText.setPosition(cc.p(0-(numText.string.length+1)*UIConstants.rankText.numSize/2-UIConstants.rankText.textSize-UIConstants.rankText.offset,0));
        this.addChild(diText);
        this.addChild(numText);
        this.addChild(mingText);
        diText.setFontFillColor(cc.color(136,136,136));
        mingText.setFontFillColor(cc.color(136,136,136));
    }
});