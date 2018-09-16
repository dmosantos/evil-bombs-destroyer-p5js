/* IMAGE */
function Images() {
	this.files = {}

	this.config = {}
}

Images.prototype.load = function(file, callback) {
	this.files[file.replace(/\..*$/g, '').replace(/-/g, '_')] = p.loadImage('images/' + file, callback);
}

Images.prototype.set = function(file, options) {
	var self = this;

	if(typeof options != 'undefined')
		Object.keys(options).forEach(function(option) {
			if(self.files[file])
                self.files[file][option](options[option]);
		});
}

Images.prototype.applyConfig = function() {
	var self = this;

	Object.keys(self.config).forEach(function(config) {
		Object.keys(self.files).forEach(function(file) {
			self.set(file, config);
		});
	});
}