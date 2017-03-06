
var SelectLayer = cc.Layer.extend({

    ctor:function () {
        this._super();

        var size = cc.winSize;

        cc.spriteFrameCache.addSpriteFrames(res.select_plist);
        cc.spriteFrameCache.addSpriteFrames(res.controlbar_plist);
        var node = ccs.load(res.select_json).node;
        this.addChild(node);

        var btnSearchNum = ccui.helper.seekWidgetByName(node, "Button_SearchNum");
        var textures = {back: "#SIDEPANEL_Listing_base.png", buttonTexture: "SIDEPANEL_Listing_select.png"};
        var menuBtnSearchNum = new mm.MenuButton({
            button: btnSearchNum,
            //items: ["20","40","60","80","100","120","140","160","180","200","250","300","350","400","450","500","550","600","650","700","750","800","850","1000"],
            items: ["20","40","60","80","100"],
            textures: textures,
            showItem:5,
            direction: mm.ScrollSelect.Direction.Left,
            isCycle:false,
            value:"20",
            fontSize: 20,
            size:cc.size(100, 120)
        });
        menuBtnSearchNum.addEventListener(mm.Events.TOUCH, this._onSearchNum, this);
        menuBtnSearchNum.mInit();

        var btnStart = ccui.helper.seekWidgetByName(node, "Button_KaiShi");
        btnStart.addClickEventListener(this._onStart);
        return true;
    },

    _onSearchNum: function(n, m) {

    },

    _onStart: function(sender) {
        GameData.currJyTotalNum = 40;
        GameData.currEveryJyTime = 5;

        cc.director.runScene(new GameScene());
    }
});

var SelectScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SelectLayer();
        this.addChild(layer);
    }
});

