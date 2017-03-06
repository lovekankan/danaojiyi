var mm = mm || {};


//events
cc.Class.prototype._register = null;
cc.Class.prototype.addEventListener = function(type, callback, sender){
    this._register = this._register || [];
    this._register[type] = {callback: callback, sender: sender};
};

cc.Class.prototype.removeEventListener = function(type){
    if(this._register && this._register[type])
        delete this._register[type];
};

cc.Class.prototype._dispatch = function(type, data){
    if(!this._register) return ;
    var dat = this._register[type];
    if(dat && cc.isFunction(dat.callback)) dat.callback.call(dat.sender, this, data);
};

cc.Class.prototype.dispatchEvent = function(type, data){
    if(!this._register) return ;
    var dat = this._register[type];
    if(dat && cc.isFunction(dat.callback)) dat.callback.call(dat.sender, this, data);
};

cc.Class.prototype._dispatchDelay = function(type, delay){
    delay = delay || 0.5;
    mm.schedule(this, function(){
        this._dispatch(type);
    }, delay , false);
};

//utils

mm.schedule = function(target, callback_fn, interval, repeat, delay, paused){
    cc.director.getScheduler().scheduleCallbackForTarget(target, callback_fn, interval, repeat, delay, paused);
};

mm.unSchedule = function(target, callback_fn){
    cc.director.getScheduler().unscheduleCallbackForTarget(target, callback_fn);
};

mm.isNumber = function(value){
    return /^\d+(\.\d+)?$/.test(value);
};

mm.parseInt = function(value){
    return mm.isNumber(value) ? parseInt(value) : 0;
};

mm.parseFloat = function(value, p){
    return parseFloat(mm.parseNumber(value).toFixed(p || 2));
};

mm.parseNumber = function(value){
	return mm.isNumber(value) ? parseFloat(value) : 0;
};

mm.parseAmount = function(value, p){
	return mm.parseNumber(value).toFixed(p || 2);
};

mm.toFixed = function(value, p){
	return mm.parseNumber(value).toFixed(p || 2);
}

mm.createSerialNo = function(){
    return new Date().format("yyyyMMddhhmmss") + Math.random();
};

mm.getWidgetByName = function(node, name){
	return ccui.helper.seekWidgetByName(node, name);
};

mm.runNumber = function(n, m, duration, cb, cb_Complete){
	n = mm.parseNumber(n);
	m = mm.parseNumber(m);
	duration = mm.parseNumber(duration) * 1000;
	var diff = m - n;
	if(!(diff > 0 && duration > 0)) return ;
	
	var step = 100, number = 0, time = 0, d = diff / (duration / step) ;
	var completed = function(){};
	
	var timer = setInterval(function(){
		number += d;
		time += step;
		
		if(time >= duration){
			number = m;
			clearInterval(timer);
			
			if(cb) cb(number, d);
			if(cb_Complete) cb_Complete();
			return ;
		}
		if(cb) cb(number, d);
	}, step);
	return timer;
};
mm.runColor = function(sender, time, cb){
	var step = 100,curTime = 0;
	
	var timer = setInterval(function(){
		curTime += step;
		sender.setColor(cc.color(256*Math.random(),256*Math.random(),256*Math.random(),256*Math.random()));
		if(curTime >= time){
			clearInterval(timer);
			
			if(cb) cb();
			return ;
		}
	}, step);
	return timer;
};

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};