/**
 * Created by leemoon on 2014/11/21.
 */

mm.MenuButtonPlus = mm.MenuButton.extend({
    _bCancel:false,
    _isShowLong:null,
    mInit: function(bg){
        this._super();

        this.addEventListener(mm.Events.TOUCH_LONG);
        this._isShowLong = true;
		this._imgMenuBg = bg;
    },
    _onTouch: function(){
        this._menu.hide();
        this._imgMenuBg && (this._imgMenuBg.visible = false);
        this._bCancel ? 0 : this._dispatch(mm.Events.TOUCH);
    },

    _onTouchLong: function(){
        if (this._bCancel == false && this._isShowLong == true) {
            this._menu.toggle();
            this._imgMenuBg && (this._imgMenuBg.visible = this._menu.visible);
        }
    },
    _onMenuTouch: function (item) {
        this._super(item);
        this._imgMenuBg && (this._imgMenuBg.visible = false);
    },
	cancelTouchEvent: function () {
        this._menu.hide();
        this._imgMenuBg && (this._imgMenuBg.visible = false);
        this._bCancel = true;
    },
	resumeTouchEvent: function () {
        this._bCancel = false;
    },
	changeDir: function (bLeft) {
        var btn = this._params.button;
        if (this._bLeft == bLeft) return;
        this._bLeft = bLeft;
        if (bLeft) {
            this._menu.setPosition(cc.p(btn.x - btn.width/2 - this._params.size.width/2, btn.y - this._params.size.height/2));
            this._imgMenuBg.scaleX = Math.abs(this._imgMenuBg.scaleX);
            this._imgMenuBg.x = 27;
        }
        else {
            this._menu.setPosition(cc.p(btn.x+btn.width/2+this._params.size.width/2, btn.y - this._params.size.height/2));
            this._imgMenuBg.scaleX = -Math.abs(this._imgMenuBg.scaleX);
            this._imgMenuBg.x = 138;
        }
    },

    setIsShowLong : function (model) {
        this._isShowLong = model;
    },

    getIsShowLong : function () {
        return this._isShowLong;
    },
	setDisabled: function (b) {
        this._super(b);
        if(!b && this._imgMenuBg)
            this._imgMenuBg.setVisible(b);
    },
	blur: function(){
		this._menu.hide();
		this._imgMenuBg&&this._imgMenuBg.setVisible(false);
	}
});
