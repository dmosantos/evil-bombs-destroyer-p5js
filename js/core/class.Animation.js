function Animation(parent, config) {
	this.type = 'Animation';
    this.id = this.type + '_' + newId();;
    this.layer = 0;
    this.context = parent.context;
    this.parent = parent;

    this.dead = false;

	this.started = false;
	this.startedAt = null;
	this.startedFrame = null;
	//this.liveUpdate = config.liveUpdate === true;
	this.loop = config.loop === true;
	this.frameRateMode = config.mode === 'FRAMERATE';
	this.duration = this.frameRateMode ? (config.duration / 1000) * 60 : config.duration;
	this.ease = config.ease || 'linear';
	this.keyframes = config.keyframes;

	this.onBeforeStart = config.onBeforeStart;
	this.onStart = config.onStart;
	this.onComplete = config.onComplete;

	this.timeElapsed;
	this.framesElapsed;
	this.percElapsed;
	this.isRunning = false;

	if(typeof this.onBeforeStart == 'function')
		this.onBeforeStart();

	$.appendElement(this);

	return this;
}

Animation.prototype._update = function() {
	if(this.parent.dead)
		this.dead = true;
	else {
		this.timeElapsed = p.millis() - this.startedAt;
		this.framesElapsed = $.states.frames.count - this.startedFrame;

		if(this.frameRateMode) {
			this.percElapsed =  this.framesElapsed / this.duration;
			this.isRunning =  this.framesElapsed < this.duration;
		} else {
			this.percElapsed =  this.timeElapsed / this.duration;
			this.isRunning =  this.timeElapsed < this.duration;
		}
	
		this.dead = this.loop ? false : !this.isRunning;

		if(!this.isRunning) {
			if(typeof this.onComplete == 'function')
				this.onComplete();

			if(this.loop)
				this.start();
		}
	}
}

Animation.prototype._draw = function() {
	var self = this;

	// if(this.liveUpdate) {
	// 	Object.keys(self.keyframes).forEach(function(keyframe) {
	// 		if(self.percElapsed * 100 >= int(keyframe)) {
	// 			Object.keys(self.keyframes[keyframe]).forEach(function(param) {
	// 				self.keyframes[keyframe][param] = self.get(param);
	// 			});
	// 		}
	// 	});
	// }
}

Animation.prototype.start = function() {
	this.started = true;
	this.startedAt = p.millis();
	this.startedFrame = $.states.frames.count;
	this.isRunning = true;

	if(typeof this.onStart == 'function')
		this.onStart();

	return this;
}

Animation.prototype.get = function(param) {
	var self = this;
	var current;
	var next;
	var r;
	var keys = Object.keys(self.keyframes);
	var percExec = EasingFunctions[self.ease](self.percElapsed);

	keys.forEach(function(keyframe, i) {
		if(percExec * 100 >= p.int(keyframe)) {
			current = keyframe;
			next = keys[i + 1];
		}
	});

	if(next) {
		var nextValue = (self.keyframes[next][param] - self.keyframes[current][param]) * ((percExec - (current / 100)) / ((next / 100) - (current / 100)));
		r = self.keyframes[current][param] + nextValue;
	} else if(current) {
		r = self.keyframes[current][param];
	}

	return r;
}