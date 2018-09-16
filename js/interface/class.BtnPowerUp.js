function BtnPowerUp() {
	Element.call(this);
    var self = this;

	this.type = 'BtnPowerUp';
	this.id = this.type + '_' + newId();
	this.layer = 20;

    if($) {
    	this.width = 49;
    	this.height = 50;
    	this.x = 0;

        $.events.on('click', this, {
            middleware: function() {
                return p.collidePointRect(p.mouseX, p.mouseY, self.x, self.y, self.width, self.height);
            }
        });

        $.events.on('keyPressed', this);
    }
    
    this.name = null;
    this.upgrade = {};
}

BtnPowerUp.prototype = new Element();

BtnPowerUp.prototype.update = function() {
    this.y = p.height - 50;
    $.upgrades.update(this.name);
}

BtnPowerUp.prototype.draw = function() {
    var self = this;

    p.noFill();
    p.strokeWeight(1);
    p.stroke($.config.secondColor, 50);

    p.line(this.x + this.width, this.y, this.x + this.width, this.y + this.height);

    p.fill($.config.secondColor, this.upgrade.enable ? 255 : this.upgrade.level ? 180 : 100);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textFont(fontAwesome);

    // Icon
    p.textSize(18);
    p.text(p.char(this.upgrade.label), this.x + (this.width / 2), this.y + (this.height * 0.55));

    // level
    p.textSize(8);
    p.text([1, 2, 3, 4, 5].reduce(function(r, i) { return i <= self.upgrade.level ? r + p.char(61445) : r }, ''), this.x + (this.width / 2), this.y + (this.height * 0.2));

    // Progress Bar XP
    p.rect(this.x, this.y, this.width * (this.upgrade.xp / this.upgrade.nextLevel[this.upgrade.level]), 5);

    // Progress Bar Energy
    p.rect(this.x, this.y + this.height - 5, this.width * (this.upgrade.enable ? this.upgrade.active ? 1 - (($.states.frames.count - this.upgrade.start) / this.upgrade.duration[this.upgrade.level]) : 1 : (this.upgrade.energy / this.upgrade.full[this.upgrade.level])), 5);

    // Ready label
    if(this.upgrade.enable && !this.upgrade.active) {
        p.rect(this.x, this.y + this.height - 10, this.width, 10);
        p.fill($.config.baseColor);
        p.textFont(fontBase);
        p.textStyle(p.BOLD);
        p.textSize(14);
        p.text('ready', this.x + (this.width / 2), this.y + this.height - 8);
    }
}

BtnPowerUp.prototype.click = function() {
    $.upgrades.activate(this.name);
}

/* Auto */
function BtnPowerUpAuto() {
    BtnPowerUp.call(this);
    
    this.x = 0;
    this.name = 'auto';
    this.upgrade = $.upgrades[this.name];
}

BtnPowerUpAuto.prototype = new BtnPowerUp();

BtnPowerUpAuto.prototype.keyPressed = function(key) {
    if(key == 90)
        this.click();
}

/* Multi */
function BtnPowerUpMulti() {
    BtnPowerUp.call(this);
    
    this.x = 50;
    this.name = 'multi';
    this.upgrade = $.upgrades[this.name];
}

BtnPowerUpMulti.prototype = new BtnPowerUp();

BtnPowerUpMulti.prototype.keyPressed = function(key) {
    if(key == 88)
        this.click();
}

/* Precision */
function BtnPowerUpPrecision() {
    BtnPowerUp.call(this);
    
    this.x = 100;
    this.name = 'precision';
    this.upgrade = $.upgrades[this.name];
}

BtnPowerUpPrecision.prototype = new BtnPowerUp();

BtnPowerUpPrecision.prototype.keyPressed = function(key) {
    if(key == 67)
        this.click();
}

/* Bounce */
function BtnPowerUpBounce() {
    BtnPowerUp.call(this);
    
    this.x = 150;
    this.name = 'bounce';
    this.upgrade = $.upgrades[this.name];
}

BtnPowerUpBounce.prototype = new BtnPowerUp();

BtnPowerUpBounce.prototype.keyPressed = function(key) {
    if(key == 86)
        this.click();
}

/* Missiles */
function BtnPowerUpMissiles() {
    BtnPowerUp.call(this);
    
    this.x = 200;
    this.name = 'missiles';
    this.upgrade = $.upgrades[this.name];
}

BtnPowerUpMissiles.prototype = new BtnPowerUp();

BtnPowerUpMissiles.prototype.keyPressed = function(key) {
    if(key == 66)
        this.click();
}