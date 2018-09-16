function BtnPause() {
	Element.call(this);
    var self = this;

	this.type = 'BtnPause';
	this.id = this.type;
	this.layer = 20;

	this.width = 49;
	this.height = 50;

    $.events.on('click', this, {
        triggerOnPause: true,
        middleware: function() {
            return !$.states.pause || $.elements.WindowPause === undefined
                ? p.collidePointRect(p.mouseX, p.mouseY, self.x, self.y, self.width, self.height)
                : p.collidePointRect(p.mouseX, p.mouseY, $.elements.WindowPause.x + ($.elements.WindowPause.width / 2) - 110, $.elements.WindowPause.y + ($.elements.WindowPause.height / 2) - 60, 100, 50);
        }
    });
}

BtnPause.prototype = new Element();

BtnPause.prototype.update = function() {
	this.x = p.width - 50;
	this.y = p.height - 50;
}

BtnPause.prototype.draw = function() {
    p.noFill();
    p.strokeWeight(1);
    p.stroke($.config.secondColor, 50);

    p.line(this.x, this.y, this.x, this.y + this.height);

    p.fill($.config.secondColor);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(18);
    p.textFont(fontAwesome);
    p.text(p.char(!$.states.pause ? 61516 : 61515), this.x + (this.width / 2), this.y + (this.height / 2) - 1);
}

BtnPause.prototype.click = function() {
    $.states.pause = !$.states.pause;

    if($.states.pause)
        $.appendElement(new WindowPause());
    else
        $.elements.WindowPause.dead = true;
}