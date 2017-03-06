
mm.MenuListButton = mm.Button.extend({
    _menu: null,
    _params: null,

    ctor: function(params){
        this._super(params.button, params.sound);
        this._params = params;
    },

    mInit: function(){
        var btn = this._params.button;
        var container = btn.parent;

        this._params.size = this._params.size || cc.size(btn.width, btn.height*4);
        this._params.order = this._params.order || mm.MenuList.Direction.Up;
        this._menu = new mm.MenuList(this._params);
        this._menu.addTouchEventListener(this._onMenuTouch, this);
        this._menu.mInit();
        this._menu.hide();
        container.addChild(this._menu);
        this._menu.setLocalZOrder(btn.getLocalZOrder());

        if (this._params.order == mm.MenuList.Direction.Up) {
            this._menu.setPosition(cc.p(btn.x, btn.y+btn.height/2));
        }
        else if (this._params.order == mm.MenuList.Direction.Down) {
            this._menu.setPosition(cc.p(btn.x, btn.y - btn.height/2 - this._menu.height));
        }
    },

    blur: function(){
        this._menu.hide();
    },

    setDisabled: function (b) {
        this._super(b);
        if (!b && this._menu)
            this._menu.setVisible(b);
    },

    _onTouch: function(){
        this._menu.toggle();
        this._dispatch(mm.Events.TOUCH);
    },

    _onMenuTouch: function(item){
        cc.log("click form menu button " + item);
        this._menu.hide();
        this._dispatch(mm.Events.TOUCH, {value:item.value});
    }
});