function BtnSound() {
	Element.call(this);
    var self = this;

	this.type = 'BtnSound';
	this.id = this.type;
	this.layer = 20;

	this.width = 49;
	this.height = 50;

	this.mute = $.data.get('mute');

    $.events.on('click', this, {
        triggerOnPause: true,
        middleware: function() {
            return p.collidePointRect(p.mouseX, p.mouseY, self.x, self.y, self.width, self.height);
        }
    });
}

BtnSound.prototype = new Element();

BtnSound.prototype.update = function() {
	this.x = p.width - 50;
	this.y = p.height - 50;
}

BtnSound.prototype.draw = function() {
    p.noFill();
    p.strokeWeight(1);
    p.stroke($.config.secondColor, 50);

    p.line(this.x, this.y, this.x, this.y + this.height);

    p.fill($.config.secondColor);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(18);
    p.textFont(fontAwesome);
    p.text(p.char(61480), this.x + (this.width / 2), this.y + (this.height / 2) - 1);

    if(this.mute) {
        p.noFill();
    	p.stroke($.config.secondColor);
    	p.strokeWeight(3);
        p.translate(this.x + (this.width / 2), this.y + (this.height / 2));
        p.rotate(-45);
    	p.line(-((this.width * 0.6) / 2) + 2, 0, ((this.width * 0.6) / 2) - 2, 0);
        p.ellipse(0, 0, this.width * 0.6, this.height * 0.6);
    }
}

BtnSound.prototype.click = function() {
	this.mute = !this.mute;

	$.data.set('mute', this.mute);

	if(this.mute)
		mute();
	else
		unmute();
}