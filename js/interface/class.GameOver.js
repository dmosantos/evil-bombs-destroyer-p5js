function GameOver() {
	Element.call(this);
    var self = this;

	this.type = 'GameOver';
	this.id = this.type;

    this.record = $.data.get('record');
    this.recordName = $.data.get('recordName');
    this.showRecord = true;

    if(!this.record || $.states.points > this.record) {
        this.showRecord = false;
        setTimeout(function() {
            self.record = $.states.points;
            self.recordName = (prompt('NOVO RECORDE!\n\nSeu nome:') || 'Anonymous').substr(0, 20);
            $.data.set('record', self.record);
            $.data.set('recordName', self.recordName);
            self.showRecord = true;
        }, 0);
    }

    $.events.on('click', this);
}

GameOver.prototype = new Element();

GameOver.prototype.update = function() {
    this.width = p.width;
	this.height = p.height;
}

GameOver.prototype.draw = function() {
	p.background(150 * p.noise(p.millis() / 1000), 150 * p.noise(p.millis() / 900), 150 * p.noise(p.millis() / 1100));
    
    p.fill(255);
    p.noStroke();

    p.textAlign(p.CENTER, p.CENTER);

    p.textSize(32);
    p.textStyle(p.BOLD);
    p.text('GAME OVER', (p.width * 0.5) - 125, this.height * 0.25, 250);

    p.textSize(18);
    p.textStyle(p.NORMAL);
    p.text(
        'SCORE: ' + String($.states.points) + '\n\n\n' +
        (
            this.showRecord
                ? (
                    ($.states.points >= this.record ? 'NEW HIGH SCORE!' : 'HIGH SCORE') + '\n' +
                    this.recordName + ': ' + String(this.record)
                )
                : ''
        ) +
        ($.states.frames.count - $.states.frames.start > 120 ? '\n\n\nTOUCH TO RESTART' : '')
    , 0, this.height * 0.45, this.width);

    p.textSize(14);
    p.text('by Diego Marques', 0, this.height - 20, this.width);
}

GameOver.prototype.click = function() {
    if($.states.frames.count - $.states.frames.start > 120) {
        $.events.off('click', this);
        $.contexts.show('gamePlay');
    }
}