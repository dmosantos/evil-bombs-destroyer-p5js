/* EVENTS */
function Events() {
    this.listeners = {}
}

Events.prototype.on = function(type, obj, config) {
    if(!this.listeners[type])
        this.listeners[type] = [];

    this.off(type, obj);
    this.listeners[type].push({
        obj: obj,
        config: config || {}
    });
}

Events.prototype.off = function(type, obj) {
    this.listeners[type] = this.listeners[type].filter(function(search) {
        return search.obj !== obj;
    });
}

Events.prototype.trigger = function(type, param) {
    if(this.listeners[type]) {
        var self = this;
        this.listeners[type].forEach(function(event) {
            if(!event.obj.dead && (!$.states.pause || event.config.triggerOnPause)) {
                if(event.config.middleware ? event.config.middleware() : true)
                    event.obj[event.config.call || type](param);
            }
        });
    }
}