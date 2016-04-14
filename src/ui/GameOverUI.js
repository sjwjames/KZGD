/**
 * Created by sjwjames on 16/3/14.
 */
var GameOverUI = cc.Layer.extend({
    ctor: function () {
        this._super();
        var bg=new cc.LayerColor(cc.color(0,0,0,126),cc.winSize.width,cc.winSize.height);
        this.addChild(bg,1);
        var gradeText=new cc.Sprite("#overText.png");
        gradeText.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/4*3));
        this.addChild(gradeText,2);
        var grade=new cc.LabelTTF(GameStats.currentGrade+"",UIConstants.fontName,UIConstants.gameOverUI.fontSize,cc.size(100,50),cc.TEXT_ALIGNMENT_CENTER,cc.TEXT_ALIGNMENT_CENTER);
        grade.setPosition(cc.p(cc.winSize.width/2+95,cc.winSize.height/4*3-34));
        this.addChild(grade,2);
        var retryBtn=new cc.MenuItemImage("#retry.png","#retry.png",this.onRetry,this);
        //var quitBtn=new cc.MenuItemImage("#quit.png","#quit.png",this.onQuit,this);
        //var shareBtn=new cc.MenuItemImage("#invite.png","#invite.png",this.onShare,this);
        var rankBtn=new cc.MenuItemImage("#rankRed.png","#rankRed.png",this._openRank,this);
        var menu=new cc.Menu(retryBtn,rankBtn);
        menu.alignItemsHorizontally();
        menu.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
        this.addChild(menu,2);

        var shareText=new cc.Sprite("#share.png");
        shareText.setPosition(cc.p(cc.winSize.width+cc.director.getVisibleOrigin().x-220,cc.winSize.height/4*3));
        this.addChild(shareText,2);

        var hasGift=false;
        if(hasGift){
            var rankLevel="一";
            var giftText=new cc.LabelTTF("您获得了第"+rankLevel+"档激活码",UIConstants.fontName,UIConstants.gameOverUI.fontSize,cc.size(10*UIConstants.gameOverUI.fontSize,50),cc.TEXT_ALIGNMENT_CENTER,cc.TEXT_ALIGNMENT_CENTER);
            var operationText=new cc.LabelTTF("长按复制",UIConstants.fontName,UIConstants.gameOverUI.fontSize,cc.size(4*UIConstants.gameOverUI.fontSize,50),cc.TEXT_ALIGNMENT_LEFT,cc.TEXT_ALIGNMENT_CENTER);
            operationText.setColor(cc.color(254,226,71));
            giftText.setPosition(cc.p(cc.winSize.width/2+cc.director.getVisibleOrigin().x-80,cc.winSize.height/3));
            giftText.setAnchorPoint(cc.p(0.5,0.5));
            operationText.setPosition(giftText.x+(giftText.getString().length-3)*UIConstants.gameOverUI.fontSize,giftText.y);
            this.addChild(giftText,2);
            this.addChild(operationText,2);
            //var code=document.getElementById("code");
            //code.removeAttribute("hidden");

            var codeLayer=new cc.LayerColor(cc.color(255,255,255),300,66);
            codeLayer.setPosition(cc.p(giftText.x-UIConstants.gameOverUI.fontSize*5,operationText.y-100));
            var code="adsasddafdfasaA";
            var codeText=new cc.LabelTTF(code,UIConstants.fontName,UIConstants.gameOverUI.fontSize,cc.size(code.length*UIConstants.gameOverUI.fontSize,50),cc.TEXT_ALIGNMENT_CENTER,cc.TEXT_ALIGNMENT_CENTER);
            codeText.setColor(cc.color(0,0,0));
            codeText.setPosition(this.convertToNodeSpace(cc.p(codeLayer.width/2,codeLayer.height/2)));
            codeLayer.addChild(codeText,1);
            this.addChild(codeLayer,2);

            var exchangeBtn=new cc.LayerColor(cc.color(244,217,68),200,66);
            exchangeBtn.setPosition(cc.p(operationText.x-60,codeLayer.y));
            var exchangeText=new cc.LabelTTF("前往兑换",UIConstants.fontName,UIConstants.gameOverUI.fontSize,cc.size(4*UIConstants.gameOverUI.fontSize,50),cc.TEXT_ALIGNMENT_CENTER,cc.TEXT_ALIGNMENT_CENTER);
            exchangeText.setColor(cc.color(0,0,0));
            exchangeText.setPosition(this.convertToNodeSpace(cc.p(exchangeBtn.width/2,exchangeBtn.height/2)));
            exchangeBtn.addChild(exchangeText,1);
            this.addChild(exchangeBtn,2);

            try {
                var exchangeBtnListener=ListenerFactory.getTouchListener(function(touch,event){
                    if(OnTouch.withInReach(touch,event)){
                        window.location.href="http://www.github.com";
                    }
                }.bind(this));
                cc.eventManager.addListener(exchangeBtnListener,exchangeBtn);
            }catch (e){
                console.log(e);
            }
        }else{
            var sorryText="对不起";
            var noneText="该档次已经被抢光咯";
            var againText="少侠下次赶早来哦!";
            var noneGift=new cc.Sprite("#noneGift.png");
            noneGift.setPosition(cc.p(cc.winSize.width/3+cc.director.getVisibleOrigin().x-60,cc.winSize.height/3));
            this.addChild(noneGift,2);
            var sorryTextTTF=new cc.LabelTTF(sorryText,UIConstants.fontName,UIConstants.gameOverUI.fontSize,cc.size(sorryText.length*UIConstants.gameOverUI.fontSize,50),cc.TEXT_ALIGNMENT_CENTER,cc.TEXT_ALIGNMENT_CENTER);
            var noneTextTTF=new cc.LabelTTF(noneText,UIConstants.fontName,UIConstants.gameOverUI.fontSize,cc.size(noneText.length*UIConstants.gameOverUI.fontSize,50),cc.TEXT_ALIGNMENT_CENTER,cc.TEXT_ALIGNMENT_CENTER);
            var againTextTTF=new cc.LabelTTF(againText,UIConstants.fontName,UIConstants.gameOverUI.fontSize,cc.size(againText.length*UIConstants.gameOverUI.fontSize,50),cc.TEXT_ALIGNMENT_LEFT,cc.TEXT_ALIGNMENT_CENTER);
            sorryTextTTF.setPosition(cc.p(noneGift.x+100,noneGift.y));
            noneTextTTF.setPosition(cc.p(sorryTextTTF.x+sorryTextTTF.width*2,sorryTextTTF.y));
            noneTextTTF.setColor(cc.color(254,226,71));
            againTextTTF.setPosition(cc.p(sorryTextTTF.x+sorryTextTTF.width,noneGift.y-50));
            this.addChild(sorryTextTTF,2);
            this.addChild(noneTextTTF,2);
            this.addChild(againTextTTF,2);
        }

    },
    onRetry: function () {
        GameController.retry();
    },
    onQuit: function () {
        GameController.quit();
    },
    _openRank: function () {
        var rankUI=new RankUI();
        this.parent.addChild(rankUI,3);
       this.parent.removeChild(this);

    },
    onExit: function () {
        this._super();
        //var code=document.getElementById("code");
        //code.setAttribute("hidden","");
    }

});