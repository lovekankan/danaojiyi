/**
 * Created by leemoon on 2014/11/6.
 */

mm.Component = cc.Class.extend({
    _node: null,
    tag: null,
    ctor: function(node, tag){
    	this._node = node;
        this.tag = tag || (node ? node.tag : tag);
    },

    show: function(){
        this._node.visible = true;
    },

    hide: function(){
        if(this._node) this._node.visible = false;
    },

    toggle: function(){
        if(this._node) this._node.visible = !this._node.visible;
    },

    setEnabled: function(bool){
        if(this._node) this._node.setEnabled(bool);
    },

    setVisible: function (bool) {
        if(this._node) this._node.setVisible(bool);
    },
    getEnabled: function(bool){
        if(this._node) return this._node.enabled;
        return null;
    },

    getVisible: function (bool) {
        if(this._node) return this._node.visible;
        return null;
    },
    getWidth: function(){
        return this._node.width;
    },

    getHeight: function(){
        return this._node.height;
    },

    setPosition: function(p){
        if(this._node) this._node.setPosition(p);
    },

    getInstance: function(){
        return this._node;
    },
	
    getParent: function(){
        return this._node.getParent();
    },

    getWorldPosition: function(){
        var p = this._node.getPosition();
        return this.getParent().convertToWorldSpace(p);
    },

    getWidgetByName: function(name){
        return ccui.helper.seekWidgetByName(this._node, name);
    }
});