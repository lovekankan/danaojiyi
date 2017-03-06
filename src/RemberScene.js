
var RemberLayer = cc.Layer.extend({
    sprite:null,

    ctor:function () {
        this._super();

        var size = cc.winSize;

        cc.spriteFrameCache.addSpriteFrames(res.rember_plist);
        var node = ccs.load(res.rember_json).node;
        this.addChild(node);

        var btnSearch = ccui.helper.seekWidgetByName(node, "Button_Search");
        var btnTiJiao = ccui.helper.seekWidgetByName(node, "Button_TiJiao");
        btnTiJiao.addClickEventListener(this._onTiJiao);

        var btnLeftPage = ccui.helper.seekWidgetByName(node, "Button_LeftPage");
        var btnRightPage = ccui.helper.seekWidgetByName(node, "Button_RightPage");
        btnLeftPage.addClickEventListener(this._onLeftPage.bind(this));
        btnRightPage.addClickEventListener(this._onRightPage.bind(this));

        var labDes = ccui.helper.seekWidgetByName(node, "Label_Des");
        var labRange = ccui.helper.seekWidgetByName(node, "Label_Range");

        this._currRemberIndex = 0;
        this._selectMode = 0;
        this._nameArr = [];
        this._numArr = [];
        this._tfNameArr = [];
        this._tfNumArr = [];
        this._everyZuNums = 20;
        for (var i = 0; i < this._everyZuNums; i++) {
            var labName = ccui.helper.seekWidgetByName(node, "Label_Name"+i);
            var labNum = ccui.helper.seekWidgetByName(node, "Label_Num"+i);
            var tfName = ccui.helper.seekWidgetByName(node, "TextField_Name"+i);
            var tfNum = ccui.helper.seekWidgetByName(node, "TextField_Num"+i);
            this._nameArr.push(labName);
            this._numArr.push(labNum);
            this._tfNameArr.push(tfName);
            this._tfNumArr.push(tfNum);
        }
        this._selectModeFunc();

        return true;
    },

    _selectModeFunc: function() {
        for (var i=0; i<this._everyZuNums; i++) {
            this._nameArr[i].setVisible(false);
            this._numArr[i].setVisible(false);
            this._tfNameArr[i].setVisible(false);
            this._tfNumArr[i].setVisible(false);

            this._tfNameArr[i].setPlaceHolder("输入名称");
            this._tfNumArr[i].setPlaceHolder("输入数字");
            this._tfNumArr[i].setPlaceHolderColor(cc.color(200,200,200));
            this._tfNameArr[i].setPlaceHolderColor(cc.color(200,200,200));

            this._tfNumArr[i].setTextColor(cc.color(0,0,0));
            this._tfNameArr[i].setTextColor(cc.color(0,0,0));

            if (GameData.jyDataArr[this._currRemberIndex]) {
                if (this._selectMode == 0) {    //填数字
                    this._nameArr[i].setVisible(true);
                    this._tfNumArr[i].setVisible(true);
                }
                else if (this._selectMode == 1) { //填名称
                    this._numArr[i].setVisible(true);
                    this._tfNameArr[i].setVisible(true);
                }
                else if (this._selectMode == 2) {  //全部填
                    this._tfNameArr[i].setVisible(true);
                    this._tfNumArr[i].setVisible(true);
                }

                this._nameArr[i].setString(GameData.jyDataArr[this._currRemberIndex][1]);
                this._numArr[i].setString(GameData.jyDataArr[this._currRemberIndex][0]);
            }
            this._currRemberIndex++;
        }
    },

    _onTiJiao: function(sender) {
        cc.director.runScene(new ResultScene);
    },

    _onLeftPage: function(sender) {

    },

    _onRightPage: function(sender) {
        this._selectModeFunc();
    }
});

var RemberScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        var layer = new RemberLayer();
        this.addChild(layer);
    }
});

