
var ResultLayer = cc.Layer.extend({
    sprite:null,

    ctor:function () {
        this._super();

        var size = cc.winSize;
        cc.spriteFrameCache.addSpriteFrames(res.resultpanel_plist);

        var node = ccs.load(res.resultpanel_json).node;
        this.addChild(node);

        var btnZy = ccui.helper.seekWidgetByName(node, "Panel_Zy");
        btnZy.addClickEventListener(this._onZy);


        var labJyNums = ccui.helper.seekWidgetByName(node, "Label_JyNums");
        var labJyHs = ccui.helper.seekWidgetByName(node, "Label_HaoShi");
        var labJyZqRate = ccui.helper.seekWidgetByName(node, "Label_ZqRate");
        var labJyLscj = ccui.helper.seekWidgetByName(node, "Label_HistoryCj");

        labJyNums.setString(GameData.currJyTotalNum);
        labJyHs.setString(Tools.formatTime(GameData.currCostTotalTime));
        //labJyZqRate.setString(GameData.currJyTotalNum);
        //labJyLscj.setString(GameData.currJyTotalNum);

        return true;
    },

    _onZy: function(sender) {
        cc.director.runScene(new StartScene);
    }
});

var ResultScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        var layer = new ResultLayer();
        this.addChild(layer);
    }
});

