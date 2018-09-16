function WindowPause() {
	Element.call(this);
    var self = this;

	this.type = 'WindowPause';
	this.id = this.type;
	this.layer = 30;
    this.updateOnPause = true;

	this.width = 300;
	this.height = 250;

    $.events.on('click', this, {
        triggerOnPause: true
    });
}

WindowPause.prototype = new Element();

WindowPause.prototype.update = function() {
	this.x = p.width / 2;
	this.y = p.height / 2;
}

WindowPause.prototype.draw = function() {
    
    // Overlay
    p.noStroke();
    p.fill(0, 200);
    p.rect(0, 0, p.width, p.height);

    // Window
    p.fill(255);
    p.rect(this.x - (this.width / 2), this.y - (this.height / 2), this.width, this.height, 5);

    // Title
    p.fill(0);   
    p.textAlign(p.CENTER, p.BOTTOM);
    p.textSize(18);
    p.textStyle(p.BOLD);
    p.text('PAUSE', this.x - (this.width / 2), this.y - (this.height / 2), this.width, 50);

    // Sound Button
    p.noStroke();
    p.textAlign(p.CENTER, p.TOP);
    p.textStyle(p.NORMAL);
    p.text('Sound', this.x - (this.width / 2) + 10, this.y - (this.height / 2) + 70, (this.width / 2) + 10, this.height);

    p.noFill()
    p.stroke(0);
    p.strokeWeight(2);
    p.rect(this.x - (this.width / 2) + (this.width / 4) - 15, this.y - (this.height / 2) + 100, 50, 50, 5);

    if($.sounds.config.sound.setVolume == 1) {
        p.fill(0);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(30);
        p.textFont(fontAwesome);
        p.text(p.char(61452), this.x - (this.width / 2) + (this.width / 4) - 15, this.y - (this.height / 2) + 98, 58, 50);
    }

    // Music Button
    p.noStroke();
    p.fill(0);
    p.textFont(fontBase);
    p.textAlign(p.CENTER, p.TOP);
    p.textStyle(p.NORMAL);
    p.textSize(18);
    p.text('Music', this.x - 10, this.y - (this.height / 2) + 70, (this.width / 2) + 10, this.height);

    p.noFill()
    p.stroke(0);
    p.strokeWeight(2);
    p.rect(this.x + (this.width / 4) - 35, this.y - (this.height / 2) + 100, 50, 50, 5);

    if($.sounds.config.music.setVolume == 1) {
        p.fill(0);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(30);
        p.textFont(fontAwesome);
        p.text(p.char(61452), this.x + (this.width / 4) - 35, this.y - (this.height / 2) + 98, 58, 50);
    }

    // Ok Button
    p.fill(200);
    p.noStroke();
    p.rect(this.x + (this.width / 2) - 110, this.y + (this.height / 2) - 60, 100, 50, 5);
    p.fill(0);
    p.textFont(fontBase);
    p.textAlign(p.CENTER, p.CENTER);
    p.textStyle(p.BOLD);
    p.textSize(18);
    p.text('RESUME', this.x + (this.width / 2) - 110, this.y + (this.height / 2) - 60, 110, 43);

    // Exit Button
    p.fill(200);
    p.rect(this.x - (this.width / 2) + 10, this.y + (this.height / 2) - 60, 80, 50, 5);
    p.fill(0);
    p.text('EXIT', this.x - (this.width / 2) + 10, this.y + (this.height / 2) - 60, 90, 43);
}

WindowPause.prototype.click = function() {

    // Sound Button
    if(p.collidePointRect(p.mouseX, p.mouseY, this.x - (this.width / 2) + (this.width / 4) - 15, this.y - (this.height / 2) + 100, 50, 50))
        $.sounds.config.sound.setVolume = $.sounds.config.sound.setVolume == 1 ? 0 : 1;

    // Music Button
    if(p.collidePointRect(p.mouseX, p.mouseY, this.x + (this.width / 4) - 35, this.y - (this.height / 2) + 100, 50, 50))
        $.sounds.config.music.setVolume = $.sounds.config.music.setVolume == 1 ? 0 : 1;

    $.sounds.applyConfig();

    // Exit Button
    if(p.collidePointRect(p.mouseX, p.mouseY, this.x - (this.width / 2) + 10, this.y + (this.height / 2) - 60, 80, 50))
        if(confirm('Exit Game?')) {
            $.elements.BtnPause.click();
            $.elements.Player.dead = true;
        }
}