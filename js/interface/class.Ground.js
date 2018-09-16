function Ground() {
	Element.call(this);

	this.type = 'Ground';
	this.id = this.type;
	this.layer = 11;
}

Ground.prototype = new Element();

Ground.prototype.update = function() {
	this.y = p.height - 50;
	this.width = p.width;
	this.height = p.height - this.y;
}

Ground.prototype.draw = function() {
    p.fill($.config.baseColor);
    p.noStroke();

    p.rect(this.x, this.y, this.width, this.height);
}