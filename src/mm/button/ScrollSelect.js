/**
 * Created by xxf on 12/19/2014.
 * 目前只支持WidgtUI控件
 *
 *  1. touchTime < 0.3 s 判定为加速
 *  2. 平衡性判断
 *  3. 平衡后停止
 */

mm.ScrollSelect = ccui.Layout.extend({
    _visibleClipNumber:3,   // 同时显示Item的个数
    _velocity:3,            // 速率
    _timeLimit:0.5,         // 时间限制
    _distanceLimit:500,     // 距离限制
    _timeCondition:0.3,     // 时间条件
    _distanceCondition:30,  // 距离条件

    _diffY:0,
    _diffYCount:0,          // 周期性计数,y轴的移动距离
    _onceDiffYCount:0,      // 一次触摸y轴的移动距离
    _timeCount:0,           // 触摸时间计时
    _runningAction:null,
    _list:null,
    _originList:null,
    _currentNum:2,
    _beginNum:2,

    _beginPos:null,
    _beginY:null,           // index1 的坐标
    _contentNode:null,
    _backGround:null,

    _bMoveing:false,
    _bTouching:false,
    _bBeginCountTime:false,
    _isDirty:false,
    _firstUp:true,

    _fontColor: cc.color.BLACK,
    _fontSize: 30,
    _fontName: "微软雅黑",

    _params:null,

    ctor: function (params) { //params 参数列表： items, textures.back, size, showImte, isCycle
        this._super();
		this._fontColor = cc.color.BLACK,
        params.isCycle = params.isCycle != null ? params.isCycle : true;
        this._params = params;
        this._fontSize = params.fontSize || this._fontSize;
        this.setClippingEnabled(true);
        this._initBg();
        this._initButton();
        this.setContentSize(params.size);
        this.setAnchorPoint(cc.p(0.5, 0));
        this.ignoreAnchor = false;
        this._contentNode = new cc.Node();
        this._contentNode.setAnchorPoint(cc.p(0.5,0));
        this.addChild(this._contentNode);
        this._contentNode.setPosition(cc.p(this.width/2, 0));
        this._initItem();
        this._initTouch();
        this._initData();
        this._initContentNodePosition();

        this.scheduleUpdateWithPriority(0);
    },

    _initItem: function () {
        // 创建N个Item
        var params = this._params;
        this._list = [];
        this._originList = [];
        var textHeight = params.size.height/params.showItem;  //每个文本的height
        //this._fontSize = textHeight*0.7;
        //this._fontName = mm.Fonts.ARIAL_BOLD;
		//this._fontName = "微软雅黑";
        if(params.isCycle){
            for(var i = 0; i < params.items.length-1; i++){
                var text = ccui.Text.create(params.items[i], this._fontName, this._fontSize);
                text.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                text.getVirtualRenderer().setColor(this._fontColor);
                text.setTextAreaSize(cc.size(params.size.width, textHeight));
                text.setPosition(cc.p(0, i* textHeight + textHeight/2));
                this._contentNode.addChild(text,1,i);
                this._list.push(text);
                this._originList.push(text);
            }
            for(var i = params.items.length - 1; i < params.items.length; i++){
                var text = ccui.Text.create(params.items[i], this._fontName, this._fontSize);
                text.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                text.getVirtualRenderer().setColor(this._fontColor);
                text.setTextAreaSize(cc.size(params.size.width, textHeight));
                text.setPosition(cc.p(0, -textHeight/2));
                this._contentNode.addChild(text,1,i);
                this._list.unshift(text);
                this._originList.push(text);
            }
        }else {
            for(var i = 0; i < params.items.length; i++){
                var textString = params.items[i];
                var text = ccui.Text.create(textString, this._fontName, this._fontSize);
                if (textString == "8" && this._params.isInfinity)
                    text.setRotation(90);
                text.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                text.getVirtualRenderer().setColor(this._fontColor);
                text.setTextAreaSize(cc.size(params.size.width, textHeight));
                text.setPosition(cc.p(0, i* textHeight + textHeight/2));
                this._contentNode.addChild(text,1,i);
                this._list.push(text);
                this._originList.push(text);
            }
        }

    },

    _initContentNodePosition: function(){
        // update contentNode y axis
        var params = this._params;
        this._beginY = 0;
        if(!params.isCycle){
            var index = params.value != null ? this._getIndexNumWithValue(params.value) : 1;
            var itemHeight = (params.size.height/params.showItem);
            var beginY = Math.floor(params.showItem/2) * itemHeight;
            beginY = beginY - (index-1) * itemHeight;
            this._contentNode.y = beginY;
            this._beginY = beginY;
        }
    },

    _initTouch:function(){
        this._lister = cc.EventListener.create({
            swallowTouches: true,
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:this._onTouchBegan,
            onTouchMoved:this._onTouchMoved,
            onTouchEnded:this._onTouchEnded
        });
        cc.eventManager.addListener(this._lister ,this);
    },

    _initData: function(){
        // init data
        var params = this._params;
        this._diffYCount = 0;
        this._beginPos = cc.p(0,0);
        this._distanceLimit = params.size.height + Math.random()*80 - 40;
        if(params.isCycle){
            this._currentNum = Math.ceil(params.showItem/2);
        }else{
            this._currentNum = params.value != null ? this._getIndexNumWithValue(params.value) : 1;
        }
        this._beginNum = this._currentNum;
        if (this._currentNum == undefined || this._currentNum == null)
            cc.log("scroll select cache...........");
        this._realValue = this._originList[this._currentNum-1].getString();
    },

    addTouchEventListener: function(listener, sender){
        this._listener = listener;
        this._sender = sender;
    },

    _initBg: function () {
        var params = this._params;
        if(params.textures.back){
            var sprite = new cc.Sprite(params.textures.back);
            var spriteBg = ccui.Scale9Sprite.createWithSpriteFrame(sprite.getSpriteFrame());
            this.addChild(spriteBg);
            spriteBg.setContentSize(params.size);
            spriteBg.setAnchorPoint(cc.p(0.5, 0.5));
            spriteBg.setPosition(cc.p(params.size.width/2, params.size.height/2));
        }

        if (params.textures.triangleTexture) {
            var spriteBgLeft = cc.Sprite.create(params.textures.triangleTexture.left);
            spriteBgLeft.setAnchorPoint(cc.p(0, 0.5));
            spriteBgLeft.setPosition(cc.p(0, params.size.height/2));
            spriteBgLeft.setScale(params.size.height/params.showItem/spriteBgLeft.height);
            this.addChild(spriteBgLeft, 10, 10);

            var spriteBgRight = cc.Sprite.create(params.textures.triangleTexture.right);
            spriteBgRight.setAnchorPoint(cc.p(1, 0.5));
            spriteBgRight.setScale(params.size.height/params.showItem/spriteBgRight.height);
            spriteBgRight.setPosition(cc.p(params.size.width, params.size.height/2));
            this.addChild(spriteBgRight, 10, 10);
        }
    },

    _initButton: function () {
        var params = this._params;
        var btn = new ccui.Button();
        btn.setTouchEnabled(true);
        btn.setSwallowTouches(false);
        params.textures.buttonTexture&&btn.loadTextures(params.textures.buttonTexture, params.textures.buttonTexture, params.textures.buttonTexture, ccui.Widget.PLIST_TEXTURE);
        btn.setAnchorPoint(cc.p(0.5, 0.5));
        btn.setScale9Enabled(true);
        btn.setContentSize(cc.size(params.size.width, params.size.height/params.showItem));
        this._btnSelect = new mm.Button(btn);
        this._btnSelect.setPosition(cc.p(params.size.width/2, params.size.height/2));
        this.addChild(this._btnSelect.getInstance());
		this._btnSelect.addEventListener(mm.Events.TOUCH, this._onTouch, this);
    },

    _getIndexNumWithValue: function(value){
        for(var i in this._originList){
            if(this._originList[i].getString() == value){
                return parseInt(i)+1;
            }
        }
        return 1;
    },

    update: function(dt){
        if (this.visible != this._lister.isEnabled())
            this._lister.setEnabled(this.visible);

        if(this.visible == false) return;
        
        if(!this._bTouching && this._bMoveing){ // Action中的时候，计算偏移量
            var diffY = this._contentNode.y - this._beginPos.y;
            this._diffYCount = this._diffYCount + diffY;
            this._beginPos = this._contentNode.getPosition();

        }
        if(this._params.isCycle) this.balanceLayout();
        if(this._bBeginCountTime) this._timeCount = this._timeCount + dt;
    },

    _onTouchBegan:function (touch, event) {
        var target = event.getCurrentTarget();
        if (!target.containsTouchLocation(touch)) return false;
        target._beginPos = touch.getLocation();
        target._bTouching = true;
        target._bMoveing = false;
        if (target._contentNode.isRunning())
            target._contentNode.stopAllActions();
        // 开启滑动计时
        target._bBeginCountTime = true;
        target._timeCount = 0;
        return true;
    },

    _onTouchMoved:function (touch, event) {
        // Move中的时候，计算偏移量
        var target = event.getCurrentTarget();
        var getPoint = touch.getLocation();
        if (target.containsTouchLocation(touch)){
            var diffY = getPoint.y - target._beginPos.y;
            target._contentNode.y = target._contentNode.y + diffY;
            target._beginPos = getPoint;
            target._diffYCount = target._diffYCount + diffY;
            target._onceDiffYCount = target._onceDiffYCount + diffY;
        }
    },

    _onTouchEnded:function (touch, event) {
        var target = event.getCurrentTarget();
        target._bTouching = false;

        // runAciont  // 计算滑动 // 计算距离 // 计算速度
        var downY = target._list[0].height*Math.floor(target._params.showItem/2);
        var topY = -target._list[0].height * (target._list.length- Math.ceil(target._params.showItem/2));
        if (/*Math.abs(target._onceDiffYCount) > target._distanceCondition &&*/ target._timeCount < target._timeCondition) {
            if (target._contentNode.isRunning())  target._contentNode.stopAllActions();
            var distance = Math.round(target._onceDiffYCount*target._velocity);
            var time = target._timeCount * target._velocity;
            time = time < target._timeLimit ? target._timeLimit: time;
            var pn = distance > 0 ? 1 : -1;

            var move = null;
            if(target._params.isCycle){
                distance = Math.abs(distance) > Math.abs(target._distanceLimit) ? pn * target._distanceLimit: distance;
                move = cc.moveBy(time, 0, distance);
            }else{
                if(distance + target._contentNode.y > downY){                                                           // 下边界
                    move = cc.moveTo(time, target._contentNode.x, downY); // 假值
                }else if(distance + target._contentNode.y < topY){   // 上边界
                    move = cc.moveTo(time, target._contentNode.x, topY); // 假值
                }else{
                    move = cc.moveBy(time, 0, distance);
                }
            }
            target._runningAction = cc.sequence(move.easing(cc.easeSineOut()), cc.callFunc(target.bounceBalanceLayout, target));
            target._runningAction = target._contentNode.runAction(target._runningAction);
            target._beginPos = target._contentNode.getPosition();
            target._bMoveing = true;
        }else{ // 如果不是动作，那么动作完后直接结束
            var move = null;
            if(target._params.isCycle){
                target._contentNode.y = Math.round(target._contentNode.y);
                target.bounceBalanceLayout();
            }else{
                if(target._contentNode.y < topY ){    // 上边界
                    move = cc.moveTo(0.2, target._contentNode.x, topY);
                }else if (target._contentNode.y > downY){                                                   // 下边界
                    move = cc.moveTo(0.2, target._contentNode.x, downY);
                }else{
                    target._contentNode.y = Math.round(target._contentNode.y);
                    target.bounceBalanceLayout();
                }
                if (move){
                    target._runningAction = cc.sequence(move.easing(cc.easeSineOut()), cc.callFunc(target._end, target));
                    target._runningAction = target._contentNode.runAction(target._runningAction);
                    target._beginPos = target._contentNode.getPosition();
                    target._bMoveing = true;
                }
            }

        }
        target._onceDiffYCount = 0;
        target._timeCount = 0;
        target._bBeginCountTime = false;
    },

    containsTouchLocation:function (touch) {
        var getPoint = touch.getLocation();
        var pt = this.convertToNodeSpace(getPoint);
        var myRect = cc.rect(0,0, this.width, this.height+100);
        return cc.rectContainsPoint(myRect, pt);
    },

    balanceLayout:function(){
        cc.log("this._diffYCount %f", this._diffYCount);
        if(this._diffYCount > this._list[0].height){
            var topItem = this._list.pop();
            topItem.y = this._list[0].y - this._list[0].height;
            this._list.unshift(topItem);
            this._diffYCount = this._diffYCount - this._list[0].height;
        }else if (this._diffYCount < -this._list[0].height /*|| (this._diffYCount < 0 && this._firstUp)*/) {
            var bottomItem = this._list.shift();
            bottomItem.y = this._list[this._list.length-1].y + this._list[this._list.length-1].height;
            this._list.push(bottomItem);
            this._diffYCount = this._diffYCount + this._list[0].height;
            //this._firstUp = false;
        }
    },

    bounceBalanceLayout:function(){
        var itemHight = this._list[0].height;
        var num = Math.round(this._contentNode.y%itemHight);
        var distance = 0;
        if ( num > 0){
            distance = num > itemHight/2 ? itemHight-num : -num;
            var action = cc.moveBy(0.2, 0, distance).easing(cc.easeSineOut());
            this._contentNode.runAction(cc.sequence(action, cc.callFunc(this._end, this)));
        }else if(num < 0) {
            distance = num > -itemHight/2 ? -num : -(itemHight + num);
            var action = cc.moveBy(0.2, 0, distance).easing(cc.easeSineOut());
            this._contentNode.runAction(cc.sequence(action, cc.callFunc(this._end, this)));
        }else{
            this._end();
        }
    },

    _end: function(){
        var num = Math.round((this._contentNode.y - this._beginY)/this._list[0].height);
        var num2 = -1 * (num % this._list.length);
        if (num2 > 0){
            this._currentNum = num2 + this._beginNum;
        }else if (num2 < 0){
            this._currentNum = this._list.length + num2 + this._beginNum;

        }else{
            this._currentNum = this._beginNum;
        }
        if (this._currentNum > this._list.length){
            this._currentNum = this._currentNum % this._list.length;
        }
        this._realValue = this._originList[this._currentNum-1].getString();
    },

    _onTouch: function () {
        if(cc.isFunction(this._listener))
            this._listener.call(this._sender, this._realValue);
    }

});

mm.ScrollSelect.Direction = {
    Top: "top",
    Down: "down",
    Left: "left",
    Right: "right"
};