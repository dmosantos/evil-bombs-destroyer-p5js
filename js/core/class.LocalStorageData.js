/* LOCAL STORAGE */
function LocalStorageData() {
	this.data = {};
}

LocalStorageData.prototype.load = function() {
	this.data = JSON.parse(localStorage.data || JSON.stringify({
		mute: false,
		record: null,
		recordName: null
	}));
}

LocalStorageData.prototype.save = function() {
	localStorage.data = JSON.stringify(this.data);
}

LocalStorageData.prototype.get = function(key) {
	this.load();
	return this.data[key];
}

LocalStorageData.prototype.set = function(key, value) {
	this.load();
	this.data[key] = value;
	this.save();
}