/**
 * Created by paul on 2014/12/26.
 */

mm.EventComponent = mm.Component.extend({
    _isTouchLong: false,
    _isT0ouch: null,
    _tolerancePos: cc.p(10, 10),    //触摸容错误差

    ctor: function (node, tag) {
        this._super(node, tag);
        this._register = [];
        if(node == null || (node instanceof ccui.Widget == false))
            cc.log("绑定事件出错");
        if(node) node.addTouchEventListener(this._onDispatch, this);
    },

    addEventListener: function(type, callback, sender){
        type = type || mm.Events.TOUCH;
        this._register[type] = {callback: callback, sender: sender};
    },

    _onDispatch: function(sender, type){
        var w = ccui.Widget;
        switch (type) {
            case w.TOUCH_BEGAN:
                this._onTouchBegan(sender);
                break;
            case w.TOUCH_ENDED:
                this._onTouchEnded(sender);
                break;
            case w.TOUCH_CANCELED:
                this._onTouchCanceled();
                break;
        }
    },

    _onTouchBegan: function(sender){
        this._isTouch = true;
        var events = mm.Events;
        if(!this._register[events.TOUCH_LONG]) return ;

        cc.director.getScheduler().scheduleCallbackForTarget(this, function () {
            this._isTouchLong = true;
            this._onTouchLong();
        }, mm.EventComponent.TouchLongTime, false);
    },

    _onTouchEnded: function(sender) {
        //var offset = cc.pSub(sender.getTouchEndPosition(), sender.getTouchBeganPosition());
//        if (Math.abs(offset.x) > this._tolerancePos.x || Math.abs(offset.y) > this._tolerancePos.y)
//            this._isTouch = false;
        //this._isTouch = cc.pSameAs(sender.getTouchBeganPosition(), sender.getTouchEndPosition());
        var events = mm.Events;
        if (this._register[events.TOUCH_LONG])
            cc.director.getScheduler().unscheduleAllCallbacksForTarget(this);

        if (this._isTouchLong) return this._isTouchLong = false;
        this._isTouch ? this._onTouch() : this._onSlide();
    },

    _onTouchCanceled: function () {
        var events = mm.Events;
        if (this._register[events.TOUCH_LONG])
            cc.director.getScheduler().unscheduleAllCallbacksForTarget(this);
        if (this._isTouchLong) return this._isTouchLong = false;
    },

    _onTouch: function(){
        this._dispatch(mm.Events.TOUCH);
    },

    _onSlide: function () {
        this._dispatch(mm.Events.SLIDE);
    },

    _onTouchLong: function(){
        this._dispatch(mm.Events.TOUCH_LONG);
    },

    _dispatch: function(type, p){
        var dat = this._register[type];
        if(dat && cc.isFunction(dat.callback)) dat.callback.call(dat.sender, this, p);
    }
});

mm.EventComponent.TouchLongTime = 1;