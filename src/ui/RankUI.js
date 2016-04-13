/**
 * Created by sjwjames on 16/4/7.
 */
var RankUI = cc.Layer.extend({
    ctor: function () {
        this._super();
        var bg=new cc.LayerColor(cc.color(0,0,0,200),cc.director.getVisibleSize().width,cc.director.getVisibleSize().height);
        this.addChild(bg,1);
        var returnBtn=new cc.Sprite("#return.png");
        returnBtn.setPosition(cc.p(cc.director.getVisibleSize().width+cc.director.getVisibleOrigin().x-returnBtn.width-50,cc.director.getVisibleSize().height+cc.director.getVisibleOrigin().y-100));
        this.addChild(returnBtn,2);
        try{
            var returnListener=ListenerFactory.getTouchListener(this.onReturn.bind(this));
            cc.eventManager.addListener(returnListener,returnBtn);
        }catch (ex){
            console.log(ex.message);
        }
        var myRankText=new cc.Sprite("#myRank.png");
        myRankText.setPosition(cc.p(cc.director.getVisibleSize().width/2+cc.director.getVisibleOrigin().x,returnBtn.y));
        this.addChild(myRankText,2);

        var url="https://avatars1.githubusercontent.com/u/7036047?v=3&u=0d7716cfbc894aef106ddb888aa30842fd20e5f9&s=140";
        var rankInfo={name:"sjwjames",grade:100,rankNum:100,url:url};
        var myRankLine=new RankLine(rankInfo);
        myRankLine.setPosition(cc.p(cc.director.getVisibleSize().width/3+cc.director.getVisibleOrigin().x,returnBtn.y-80));
        this.addChild(myRankLine,2);


        var allRankText=new cc.Sprite("#allRank.png");
        allRankText.setPosition(cc.p(cc.director.getVisibleSize().width/2+cc.director.getVisibleOrigin().x,cc.director.getVisibleSize().height/2+cc.director.getVisibleOrigin().y+20));
        this.addChild(allRankText,2);
        //
        this.listView=new ccui.ListView();
        this.listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.listView.setTouchEnabled(true);
        this.listView.setBounceEnabled(true);
        //设置listview可见区域
        this.listView.setContentSize(cc.size(650,200));
        this.listView.setPosition(cc.p(myRankLine.x-200,100));
        for (var i = 10; i>=1; i--) {
            rankInfo.rankNum=i;
            var item=new RankLine(rankInfo);
            //坐标系
            item.x=200;
            item.y=20;
            try{
                var listViewListener=ListenerFactory.getTouchListener(this.onListTouchBegan.bind(this),this.onListTouchMoved.bind(this),this.onListTouchEnded.bind(this));
                cc.eventManager.addListener(listViewListener,item);
            }catch(e){
                cc.log(e);
            }
            var lblLayer=new ccui.Layout();
            lblLayer.width = item.width+cc.director.getVisibleOrigin().x;
            lblLayer.height = UIConstants.rankLine.lineHeight;
            lblLayer.addChild(item);
            this.listView.insertCustomItem(lblLayer);
        }
        // 设置所有item重力方向
        this.listView.setItemsMargin(20);
        this.listView.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);
        this.addChild(this.listView,2);

        this.slider=new MySlider("#scrollBar.png","#scrollBar.png","#scrollBtn.png",this.listView);
        this.slider.setPosition(cc.p(cc.director.getVisibleOrigin().x+cc.director.getVisibleSize().width/5*4,cc.director.getVisibleOrigin().y+this.listView.y+90));
        this.slider.setMaximumValue(1);
        this.slider.setMinimumValue(0);
        this.slider.setValue(0);
        this.slider.setRotation(90);
        this.addChild(this.slider,2);

    },
    onReturn: function (touch,event) {
        if (OnTouch.withInReach(touch,event)){
            if(cc.director.getRunningScene() instanceof MenuScene){
                cc.director.runScene(new MenuScene());
            }else if(cc.director.getRunningScene() instanceof GameScene){
                var gameOverUI=new GameOverUI();
                this.parent.addChild(gameOverUI,3);
                this.parent.removeChild(this);
            }
        }


    },
    onListTouchBegan: function (touch,event) {
        this.firstTouchPositionY=(this.listView.height-this.listView.innerHeight);
        return true;
    },
    onListTouchMoved: function (touch,event) {
        var percent=(this.firstTouchPositionY-this.listView.getInnerContainer().getPositionY())/this.firstTouchPositionY;
        if(this.listView.getInnerContainer().getPositionY()>0){
            percent=1;
        }
        if(this.listView.getInnerContainer().getPositionY()<this.firstTouchPositionY){
            percent=0;
        }
        this.slider.setValue(percent);
        return true;
    },
    onListTouchEnded: function (touch,event) {
        var percent=(this.firstTouchPositionY-this.listView.getInnerContainer().getPositionY())/this.firstTouchPositionY;

        if(this.listView.getInnerContainer().getPositionY()>0){
            percent=1;
        }
        if(this.listView.getInnerContainer().getPositionY()<this.firstTouchPositionY){
            percent=0;
        }
        this.slider.setValue(percent);
    }
});