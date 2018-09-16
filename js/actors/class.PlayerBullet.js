function PlayerBullet() {
	Element.call(this);

	this.type = 'PlayerBullet';
	this.id = this.type + '_' + newId();
	this.layer = 4;

	this.direction = $.elements.Player.direction;
	this.x = $.elements.Player.x + (p.cos(this.direction) * 35);
	this.y = $.elements.Player.y + (p.sin(this.direction) * 35);
	this.diameter = 10;
	this.speed = $.upgrades.precision.active ? 30 : 10;

	this.start = $.states.frames.count;
}

PlayerBullet.prototype = new Element();

PlayerBullet.prototype.update = function() {

	if($.upgrades.bounce.active) {
		if(this.y - (this.diameter / 2) > p.height - 50)
			this.direction = wallBounce(this.direction, 0);

		if(this.y + (this.diameter / 2) < 0)
			this.direction = wallBounce(this.direction, 0);

		if(this.x - (this.diameter / 2) < 0 && this.direction <= 270 && this.direction >= 90)
			this.direction = wallBounce(this.direction, 90);

		if(this.x + (this.diameter / 2) > p.width && (this.direction > 270 || this.direction < 90))
			this.direction = wallBounce(this.direction, 90);

		if($.states.frames.count - this.start > 300)
			this._hit(1);
	} else if(this.x + (this.diameter / 2) < 0 || this.x - (this.diameter / 2) > p.width || this.y + (this.diameter / 2) < 0 || this.y - (this.diameter / 2) > p.height) {
		this._die();
	}

	if(this.direction % 360 == 0)
		this.direction--;
	else if(this.direction % 90 == 0)
		this.direction++;
}

PlayerBullet.prototype.draw = function() {
	p.translate(this.x, this.y);
    p.rotate(this.direction);
    p.translate(-this.x, -this.y);

    p.fill($.config.baseColor);
    p.stroke(0);
    p.noStroke();

    p.ellipse(this.x, this.y, this.diameter, this.diameter);
    p.beginShape();
    p.vertex(this.x, this.y - (this.diameter / 2));
    p.vertex(this.x, this.y + (this.diameter / 2));
    p.vertex(this.x - this.diameter, this.y);
    p.endShape(p.CLOSE);
}