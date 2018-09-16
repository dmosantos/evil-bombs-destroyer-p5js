function HomeScreen() {
	Element.call(this);

	this.type = 'HomeScreen';
	this.id = this.type;

    this.record = $.data.get('record');
    this.recordName = $.data.get('recordName');

    $.events.on('click', this);
    $.events.on('keyPressed', this);
}

HomeScreen.prototype = new Element();

HomeScreen.prototype.update = function() {
    this.width = p.width;
	this.height = p.height;
}

HomeScreen.prototype.draw = function() {
	p.background(150 * p.noise(p.millis() / 1000), 150 * p.noise(p.millis() / 900), 150 * p.noise(p.millis() / 1100));

    p.fill(255);
    p.noStroke();

    p.textAlign(p.CENTER, p.CENTER);

    p.textSize(32);
    p.textStyle(p.BOLD);
    p.text('EVIL BOMBS DESTROYER', (p.width * 0.5) - 125, this.height * 0.25, 250);

    p.textSize(18);
    p.textStyle(p.NORMAL);
    p.text(
        'Touch to start' +
        (
            this.record
                ? (
                    '\n\n\nRECORD' + '\n' +
                    this.recordName + ': ' + String(this.record)
                )
                : ''
        )
    , 0, this.height * 0.55, this.width);

    p.textSize(14);
    p.textStyle(p.NORMAL);
    p.text('by Diego Marques', 0, this.height - 20, this.width);
}

HomeScreen.prototype.click = function() {
    $.events.off('click', this);
    this.dead = true;
    $.contexts.show('gamePlay');
}

HomeScreen.prototype.keyPressed = function() {
    this.click();
}