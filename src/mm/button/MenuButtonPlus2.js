/**
 * Created by leemoon on 2014/11/21.
 */

mm.MenuButtonPlus2 = mm.MenuButton.extend({
    _isShowLong:null,
    mInit: function(){
        this._super();

        this.addEventListener(mm.Events.TOUCH_LONG);
        this._isShowLong = true;
    },
    _onTouch: function(){
        this._menu.hide();
        this._dispatch(mm.Events.TOUCH);
    },

    _onTouchLong: function(){
        if(this._isShowLong == true)    this._menu.toggle();
    },

    setIsShowLong : function (model) {
        this._isShowLong = model;
    },

    getIsShowLong : function () {
        return this._isShowLong;
    }
});
