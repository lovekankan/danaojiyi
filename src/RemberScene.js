
var RemberLayer = cc.Layer.extend({
    sprite:null,

    ctor:function () {
        this._super();

        var size = cc.winSize;

        cc.spriteFrameCache.addSpriteFrames(res.rember_plist);
        var node = ccs.load(res.rember_json).node;
        this.addChild(node);

        var textures = {back: "#SIDEPANEL_Listing_base.png", buttonTexture: "SIDEPANEL_Listing_select.png"};
        var btnSearch = ccui.helper.seekWidgetByName(node, "Button_Search");
        var menuBtnSearch = new mm.MenuButton({
            button: btnSearch,
            //items: ["20","40","60","80","100","120","140","160","180","200","250","300","350","400","450","500","550","600","650","700","750","800","850","1000"],
            items: ["填数字","填名称","全都填"],
            textures: textures,
            showItem:3,
            direction: mm.ScrollSelect.Direction.Left,
            isCycle:false,
            value:"填数字",
            fontSize: 20,
            size:cc.size(100, 120)
        });
        menuBtnSearch.addEventListener(mm.Events.TOUCH, this._onSearch, this);
        menuBtnSearch.mInit();

        var btnTiJiao = ccui.helper.seekWidgetByName(node, "Button_TiJiao");
        btnTiJiao.addClickEventListener(this._onTiJiao.bind(this));

        var btnLeftPage = ccui.helper.seekWidgetByName(node, "Button_LeftPage");
        var btnRightPage = ccui.helper.seekWidgetByName(node, "Button_RightPage");
        btnLeftPage.addClickEventListener(this._onLeftPage.bind(this));
        btnRightPage.addClickEventListener(this._onRightPage.bind(this));

        this._labDes = ccui.helper.seekWidgetByName(node, "Label_Des");
        var labRange = ccui.helper.seekWidgetByName(node, "Label_Range");

        this._curJyGroup = 0;   //第几组
        this._currRemberIndex = 0;  //当前记到第几个了
        this._selectMode = 0;   //选择类型
        this._nameArr = [];
        this._numArr = [];
        this._tfNameArr = [];   //name  textfield
        this._tfNumArr = [];    //num textfield
        this._everyZuNums = 20;  //每组记忆多少个
        GameData.haveJyDataArr = [];
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

    _onSearch: function(n, m) {
        if (m) {
            this._labDes.setString(m.value);
            this._selectMode = GameRemberType[m.value];
            this._currRemberIndex = 0;
            this._selectModeFunc();
        }
    },

    _selectModeFunc: function() {
        for (var i=this._curJyGroup * this._everyZuNums; i<this._everyZuNums; i++) {
            this._nameArr[i].setVisible(false);
            this._numArr[i].setVisible(false);
            this._tfNameArr[i].setVisible(false);
            this._tfNumArr[i].setVisible(false);

            this._tfNameArr[i].setString("")
            this._tfNumArr[i].setString("")

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

    _saveResult: function () {
        for (var  i = this._curJyGroup * this._everyZuNums; i < this._currRemberIndex; i++) {
            var temp = [];
            if (this._selectMode == 0) {    //填数字
                var num = this._tfNumArr[i].getString();
                temp[0] = num;
            }
            else if (this._selectMode == 1) { //填名称
                var name = this._tfNameArr[i].getString();
                temp[1] = name;
            }
            else if (this._selectMode == 2) {  //全部填
                var num = this._tfNumArr[i].getString();
                var name = this._tfNameArr[i].getString();
                temp[0] = num;
                temp[1] = name;
            }
            GameData.haveJyDataArr[i] = temp;
        }
    },

    _onTiJiao: function(sender) {
        GameData.currMode = this._selectMode;
        this._saveResult();
        cc.director.runScene(new ResultScene);
    },

    _onLeftPage: function(sender) {
        this._curJyGroup--;
        if (this._curJyGroup < 0) {
            this._curJyGroup = 0;
            return
        }
        this._saveResult()
        this._currRemberIndex = 0;
        this._selectModeFunc();
    },

    _onRightPage: function(sender) {
        this._curJyGroup++;
        if (this._curJyGroup >= Math.ceil(GameData.currJyTotalNum / this._everyZuNums)) {
            this._curJyGroup--
            return
        }
        this._saveResult()
        this._currRemberIndex = 0;
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

