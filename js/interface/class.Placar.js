function Placar() {
	Element.call(this);

	this.type = 'Placar';
	this.id = this.type;
	this.layer = 12;
}

Placar.prototype = new Element();

Placar.prototype.update = function() {
	this.x = 15;
	this.y = p.height;
	this.width = p.width;
	this.height = p.height;
}

Placar.prototype.draw = function() {
    p.fill($.config.secondColor);
    p.noStroke();

    p.textAlign(p.LEFT, p.CENTER);

    p.textSize(18);
    p.textStyle(p.BOLD);
    p.text('Score: ' + $.states.points, this.x, 25);
}