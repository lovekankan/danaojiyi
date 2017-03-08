/**
 * Created by hp on 2017/3/7.
 */

var HistoryLayer = cc.Layer.extend({

    ctor: function() {

        cc.spriteFrameCache.addSpriteFrames(res.lsjy_plist);
        var node = ccs.load(res.lsjy_json).node;
        this.addChild(node);

        this._panelTemp = ccui.helper.seekWidgetByName(node, "Panel_Temp");
        this._scrollViewHua = ccui.helper.seekWidgetByName(node, "ScrollView_Hua");
        var btnBack = ccui.helper.seekWidgetByName(node, "Button_Back");
        btnBack.addClickEventListener(this._onBackClicked);
    },

    _showHistory: function () {
        for (var i = 0; i < GameData.jyDataArr.length; i++) {
            var panelClone = this._panelTemp.clone();
            panelClone.setVisible(true);
            var labName = ccui.helper.seekWidgetByName(panelClone, "Label_Name");
            var labTime = ccui.helper.seekWidgetByName(panelClone, "Label_Time");
            var labWinRate = ccui.helper.seekWidgetByName(panelClone, "Label_WinRate");
            var labDate = ccui.helper.seekWidgetByName(panelClone, "Label_Date");
            var btnShare = ccui.helper.seekWidgetByName(panelClone, "Button_Share");
            var btnDelete = ccui.helper.seekWidgetByName(panelClone, "Button_Delete");
        }
    },

    _onBackClicked: function() {
        cc.director.runScene(new ResultScene);
    }
});

var HistoryScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        var layer = new HistoryLayer();
        this.addChild(layer);
    }
});