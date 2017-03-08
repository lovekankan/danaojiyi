
var GameLayer = cc.Layer.extend({
    sprite:null,

    ctor:function () {
        this._super();

        var size = cc.winSize;

        cc.spriteFrameCache.addSpriteFrames(res.game_plist);
        var node = ccs.load(res.game_json).node;
        this.addChild(node);

        this._labTime = ccui.helper.seekWidgetByName(node, "Label_Time");
        this._labJySz = ccui.helper.seekWidgetByName(node, "Label_Num");
        this._labJyName = ccui.helper.seekWidgetByName(node, "Label_Name");
        this._labCurr = ccui.helper.seekWidgetByName(node, "Label_Curr");
        var labTotal = ccui.helper.seekWidgetByName(node, "Label_Total");
        this._imageItem = ccui.helper.seekWidgetByName(node, "Image_Item");
        var panelHaveRember = ccui.helper.seekWidgetByName(node, "Panel_HaveRember");
        var panelNextPage = ccui.helper.seekWidgetByName(node, "Panel_NextPage");

        panelHaveRember.addClickEventListener(this._onHaveRember.bind(this));
        panelNextPage.addClickEventListener(this._onNextPage.bind(this));


        GameData.tempJyDataArr = [];
        GameData.jyDataArr = [];
        GameData.currCostTotalTime = 0;
        this._currCalcTime = GameData.currEveryJyTime;//单位为秒
        this._currIndex = 1;

        labTotal.setString(GameData.currJyTotalNum);
        this._labCurr.setString(this._currIndex);

        var randomNum = this._getRandomJyNum();
        this._labJySz.setString(randomNum);

        var randomItemIndex = this._getRandomItemIndex();
        this._imageItem.loadTexture(GameItemData[randomItemIndex], ccui.Widget.LOCAL_TEXTURE);
        this._labJyName.setString(GameItemName[randomItemIndex]);

        GameData.jyDataArr.push([randomNum, GameItemName[randomItemIndex]]);

        this._labTime.setString(this._getTimeString(this._currCalcTime));
        this.scheduleUpdate();
        
        return true;
    },

    _getRandomItemIndex: function() {   //获取随机对象，保证不重复
        var itemIndex = parseInt(Math.random() * GameData.totalItemNum);
        while(GameData.tempJyDataArr[itemIndex]) {
            itemIndex = parseInt(Math.random() * GameData.totalItemNum);
        }
        GameData.tempJyDataArr[itemIndex] = 1
        return itemIndex;
    },

    _getRandomJyNum: function () {  //获取随机数字10-99
        var data = parseInt(Math.random()* (GameData.randomMax - GameData.randomMin) + GameData.randomMin)
        return data
    },

    _onHaveRember: function(sender) {
        GameData.currCostTotalTime = GameData.currCostTotalTime + (GameData.currEveryJyTime - this._currCalcTime);
        this._gameOver();
    },

    _onNextPage: function(sender) {
        GameData.currCostTotalTime = GameData.currCostTotalTime + (GameData.currEveryJyTime - this._currCalcTime);

        this._currCalcTime = GameData.currEveryJyTime;
        this._currIndex++;
        if (this._currIndex > GameData.currJyTotalNum) {
            this._gameOver(); //游戏结束
            return;
        }
        this._nextGameItem();
    },

    _nextGameItem: function() {
        this._labCurr.setString(this._currIndex);

        var randomNum = this._getRandomJyNum();
        this._labJySz.setString(randomNum);

        var randomItemIndex = this._getRandomItemIndex();
        this._imageItem.loadTexture(GameItemData[randomItemIndex], ccui.Widget.LOCAL_TEXTURE);
        this._labJyName.setString(GameItemName[randomItemIndex]);

        GameData.jyDataArr.push([randomNum, GameItemName[randomItemIndex]]);
    },

    _gameOver: function()
    {
        cc.director.runScene(new RemberScene);
    },

    update: function(dt) {
        this._currCalcTime = this._currCalcTime - dt;
        if (this._currCalcTime < 0) {
            this._onNextPage();
        }
        this._labTime.setString(this._getTimeString(this._currCalcTime));
    },

    _getTimeString: function(time) {
        var strTime = time.toFixed(2);
        var timeArr=strTime.split("."); //字符分割 

        var second = parseInt(timeArr[0]);
        var millSecond = parseInt(timeArr[1]);

        var str = "";
        if (second < 10) {
            str = "0"+second+":"
        }
        else {
            str = str+second+":";
        }
        if (millSecond < 10) {
            str = str+"0"+millSecond
        }
        else {
            str = str+millSecond;
        }
        return str;
    }
});

var GameScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

