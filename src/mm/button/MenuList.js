mm.MenuList = cc.Node.extend({
    _list: null,
    _items: null,
    _direction: null,
    _size: null,
    _textures: null,
    _fontSize: 30,
    _listener: null,
    _sender: null,
    _inGap: null,
    _spBgUrl: null,
    _margin: 20,

    ctor: function(params){/*items, textures, direction, size, fontSize*/
        this._super();

        params = params || {};
        this._list = [];
        this._items = params.items || [];
        this._direction = params.direction || mm.MenuList.Direction.Up;
        this._size = params.size || cc.size(180, 60);
        this._textures = params.textures || {};
        this._fontSize = params.fontSize || this._fontSize;
        this._spBgUrl = params.bg;
        this._inGap = params.gap != null ? params.gap : 2;
        this._margin = params.margin != null ? params.margin : 20;
    },

    mInit: function(){
        this._temp = this._margin;
        var b = this._direction == mm.MenuList.Direction.Up;
        this._initBg();

        for(var i = 0; i < this._items.length; i ++){
            var value = this._items[i];
            var p = b ? cc.p(0, this._temp + this._size.height/2) : cc.p(this._temp, 0);
            var btnItem = new mm.Button(this._itemRender(i, value.toString()));
            btnItem.value = value;
            btnItem.setPosition(p);
            btnItem.addEventListener(mm.Events.TOUCH, this._onTouch, this);
            this.addChild(btnItem.getInstance());
            this._list.push(btnItem);

            this._temp += (b ? this._size.height : this._size.width);
            this._temp = this._temp + this._inGap;
        }
    },

    _initBg: function() {
        if (this._spBgUrl) {
            var sp = new ccui.ImageView(this._spBgUrl, ccui.Widget.PLIST_TEXTURE);
            sp.setTouchEnabled(true);
            sp.setAnchorPoint(cc.p(0.5, 0));
            this.addChild(sp);
            this.setContentSize(sp.getContentSize());
        }
        else {
            var height = this._items.length * (this._size.height + this._inGap) - this._inGap + 2 * this._margin;
            this.setContentSize(cc.size(this._size.width, height));
        }
    },

    addTouchEventListener: function(listener, sender){
        this._listener = listener;
        this._sender = sender;
    },

    _itemRender: function(index, value){
        var t = this._textures;
        if (t != null) {
            var btn = new ccui.Button();
            btn.setTouchEnabled(true);
            btn.loadTextures(t.normal, t.selected, t.disabled, t.texType);
            btn.setAnchorPoint(cc.p(0.5, 0.5));
            btn.setTag(index);
            btn.setScale9Enabled(true);
            btn.setContentSize(this._size);
            btn.setTitleText(value);
			btn.setTitleFontName("微软雅黑");
            if (value == 8) {
                btn.getTitleRenderer().setRotation(90);
            }
            btn.setTitleFontSize(this._fontSize);
            return btn;
        }
        else {
            var text = new ccui.Text(value, mm.Fonts.ARIAL_BOLD, 25);
            text.setTextAreaSize(this._size);
            text.setTouchEnabled(true);
            return text;
        }
    },

    _onTouch: function(item){
        if(cc.isFunction(this._listener))
            this._listener.call(this._sender, item);
    }
});

mm.MenuList.Direction = {
    Up: "up",
    Down: "down"
};