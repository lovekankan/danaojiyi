/**
 * Created by leemoon on 2014/11/21.
 *
 */

mm.MenuButton = mm.Button.extend({
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
        this._params.direction = this._params.direction || mm.ScrollSelect.Direction.Top;
        this._menu = new mm.ScrollSelect(this._params);
        this._menu.addTouchEventListener(this._onMenuTouch, this);
        this._menu.mInit();
        this._menu.hide();
        container.addChild(this._menu);
        this._menu.setLocalZOrder(btn.getLocalZOrder());

        if (this._params.direction == mm.ScrollSelect.Direction.Top) {
            this._menu.setPosition(cc.p(btn.x, btn.y+btn.height/2));
        }
        else if (this._params.direction == mm.ScrollSelect.Direction.Right) {
            this._menu.setPosition(cc.p(btn.x+btn.width/2+this._params.size.width/2, btn.y - this._params.size.height/2));
        }
        else if (this._params.direction == mm.ScrollSelect.Direction.Left) {
            this._menu.setPosition(cc.p(btn.x - btn.width/2 - this._params.size.width/2, btn.y - this._params.size.height/2));
        }

        if(this._params.items.length > 1)
        {
            this._params.button.setEnabled(true);
        }else
        {
            this._params.button.setEnabled(false);
            this._params.button.setBright(false);
        }
    },

    blur: function(){
        this._menu.hide();
    },

    setDisabled: function (b) {
        if(this._params.items.length <= 1) return;
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
        this._dispatch(mm.Events.TOUCH, {value:item});
    }
});