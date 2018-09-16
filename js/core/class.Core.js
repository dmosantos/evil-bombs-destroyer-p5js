var $, p;

function Core() {
	var self = this;

	// Config
	this.config = {
        baseColor: 0,
        secondColor: 255
    }

	// States Control
	this.states = {
		frames: {
			start: 0,
			count: 0,
			gap: 0
		},
		pause: false,
		background: {
	        active: 'base',
	        get: {
	            base: {
	                topColor: p.color(156, 14, 55),
	                bottomColor: p.color(255, 236, 115)
	            },
	            light: {
	                topColor: p.color(215, 20, 76),
	                bottomColor: p.color(255)
	            }
	        }
	    },
	    firstEventType: null,
		points: 0,
		enemyMaxLife: 10
	}

	// Objects
	this.images = new Images();
	this.sounds = new Sounds();
	this.data = new LocalStorageData();
	this.events = new Events();
	this.contexts = new Contexts();
	this.upgrades = new Upgrades();

	// Elements lists
	this.elements = {};
	this.by = {
		types: {},
		contexts: {}
	}
}

Core.prototype.appendElement = function(element) {

	if(typeof $.by.types[element.type] == 'undefined')
		$.by.types[element.type] = {}

	if(typeof $.by.contexts[element.context] == 'undefined')
		$.by.contexts[element.context] = {}

	if(typeof $.by.contexts[element.context][element.layer] == 'undefined')
		$.by.contexts[element.context][element.layer] = {}

	$.elements[element.id] = element;
	$.by.types[element.type][element.id] = $.elements[element.id];
	$.by.contexts[element.context][element.layer][element.id] = $.elements[element.id];
}

Core.prototype.get = function(id) {
	return $.elements[element.id];
}