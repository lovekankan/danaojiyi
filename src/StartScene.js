
var StartLayer = cc.Layer.extend({
    sprite:null,

    ctor:function () {
        this._super();

        var size = cc.winSize;

        var panel = new cc.Sprite(res.start_bg);
        this.addChild(panel);
        panel.setPosition(cc.p(size.width/2, size.height/2));

        var labDN = new cc.LabelTTF("大脑奥秘之", "Arial", 60);
        labDN.x = size.width / 2;
        labDN.y = size.height * 0.8;
        this.addChild(labDN, 5);

        var helloLabel = new cc.LabelTTF("疯狂记忆力", "Arial", 44);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height * 0.8 - labDN.height;
        this.addChild(helloLabel, 5);

        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.loadTextures(res.player_btn,"", "");
        button.x = size.width / 2.0;
        button.y = size.height * 0.55;
        button.addClickEventListener(this.touchEvent, this);
        button.setScale(0.8);
        this.addChild(button);

        var sp = new cc.Sprite(res.wexin_sprite);
        this.addChild(sp);
        sp.setPosition(cc.p(size.width/2, size.height * 0.26));

        var labDes = new cc.LabelTTF("四川西部学习力研究所", "Arial", 20);
        labDes.setPosition(cc.p(size.width/2, size.height * 0.13));
        this.addChild(labDes);

        return true;
    },

    touchEvent: function(sender, event) {
        cc.director.runScene(new SelectScene());
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});

