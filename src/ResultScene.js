
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

