/**
 * Created by leemoon on 2014/11/20.
 */
mm.Button = mm.EventComponent.extend({
    _sound: null,
    value: null,
    ctor: function(node, sound, tag){
        this._super(node, tag);

        this._sound = sound;
    },
	addTouchEventListener: function(callback,sender){
		this.addEventListener(mm.Events.TOUCH,callback,sender);
	},
    _onTouchBegan: function (sender) {
        this._super(sender);
        if(this._sound) this._sound.play();
    },

//    _onTouch: function(){
//        this._super();
//        if(this._sound) this._sound.play();
//    },

    setEnable: function(b){
    	this._node && this.setEnabled(b);
        this._node && this._node.setBright(b);
    },
	setScaleX: function(scale){
		this._node && this._node.setScaleX(scale);
	},
	getScaleX: function(){
		if(this._node){
			return	this._node.getScaleX();
		}
	},
	setEnableWithAqua: function(b){
		if(!this._node)return;
		this.setEnabled(b);
        this._node.setBright(b);
		if(b){
			for(var i in this._node.children){
				this._node.children[i].setColor(cc.color(0,255,255));
			}
			this._node.setTitleColor(cc.color(0,255,255));
		}else{
			for(var i in this._node.children){
				this._node.children[i].setColor(cc.color(0,159,156));			
			}
			this._node.setTitleColor(cc.color(0,159,156));
		}
    },
	setEnableWithRed: function(b){
		if(!this._node)return;
		this.setEnabled(b);
        this._node.setBright(b);
		if(b){
			for(var i in this._node.children){
				this._node.children[i].setColor(cc.color(255,0,0));
			}
			this._node.setTitleColor(cc.color(255,0,0));
		}else{
			for(var i in this._node.children){
				this._node.children[i].setColor(cc.color(153,0,0));			
			}
			this._node.setTitleColor(cc.color(153,0,0));
		}
    },
	setEnableWithYellow: function(b){
		if(!this._node)return;
		this.setEnabled(b);
        this._node.setBright(b);
		if(b){
			for(var i in this._node.children){
				this._node.children[i].setColor(cc.color(255,255,0));
			}
			this._node.setTitleColor(cc.color(255,255,0));
		}else{
			for(var i in this._node.children){
				this._node.children[i].setColor(cc.color(168,130,0));			
			}
			this._node.setTitleColor(cc.color(168,130,0));
		}
    }
});
