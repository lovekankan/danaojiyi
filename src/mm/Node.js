/**
 * Created by leemoon on 2014/11/12.
 */

cc.Node.prototype.source = null;

cc.Node.prototype.mInit = function(){
    //cc.log("boot init");
};

cc.Node.prototype.show = function(){
    this.visible = true;
};

cc.Node.prototype.hide = function(){
    this.visible = false;
};

cc.Node.prototype.toggle = function(b){
	if(b == undefined) this.visible = !this.visible;
	else this.visible = !!b;
};
