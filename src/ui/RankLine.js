/**
 * Created by sjwjames on 16/4/8.
 */
var RankLine=cc.Node.extend({
    rankText:null,
    portrait:null,
    nameText:null,
    gradeText:null,
    ctor: function (rankInfo) {
        this._super();
        this.rankText=new RankText(rankInfo.rankNum,"名");
        this.addChild(this.rankText);

        cc.loader.loadImg(rankInfo.url, {"isCrossOrigin":true}, function(err,img){
            this.portrait  = new cc.Sprite(img);
            this.portrait.setScaleX(UIConstants.rankLine.portraitSize/this.portrait.getContentSize().width);
            this.portrait.setScaleY(UIConstants.rankLine.portraitSize/this.portrait.getContentSize().height);
            this.portrait.setPosition(cc.p(this.rankText.width+UIConstants.rankLine.portraitSize/2+UIConstants.rankLine.portraitOffset,0));
            this.addChild(this.portrait);
        }.bind(this));

        this.nameText=new cc.LabelTTF(rankInfo.name,"Arial",UIConstants.rankLine.nameSize,cc.size(UIConstants.rankLine.nameSize*UIConstants.rankLine.maxNameLength,UIConstants.rankLine.nameSize),cc.TEXT_ALIGNMENT_CENTER,cc.TEXT_ALIGNMENT_CENTER);
        this.nameText.setPosition(cc.p(this.rankText.width+UIConstants.rankLine.portraitSize*2+UIConstants.rankLine.portraitOffset*2,0));
        this.addChild(this.nameText);

        this.gradeText=new RankText(rankInfo.grade,"波");
        this.gradeText.setPosition(cc.p(this.nameText.x+this.nameText.width,0));
        this.addChild(this.gradeText);
    }

});