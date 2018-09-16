function Player() {
    Element.call(this);
    var self = this;

    this.type = 'Player';
    this.id = this.type;
    this.layer = 10;

	this.life = 20;
	this.x = p.width / 2;
	this.y = p.height - 50;
	this.width = 60;
	this.height = 60;
    this.direction = -90;
	this.speed = 0;
    
    this.lastShoot = null;
    this.moveTo = null;
    this.key = {
        left: false,
        right: false,
        space: false
    }

    $.events.on('keyPressed', this);
    $.events.on('keyReleased', this);
    $.events.on('mouseMoved', this, {
        middleware: function() {
            return p.collidePointRect(p.mouseX, p.mouseY, 0, 0, p.width, self.y + 5)
        }
    });
    $.events.on('click', this, {
        middleware: function() {
            return p.collidePointRect(p.mouseX, p.mouseY, 0, 0, p.width, self.y + 5)
        }
    });
}

Player.prototype = new Element();

Player.prototype.update = function() {
    this.x = p.width / 2;
    this.y = p.height - 55;

    if(this.key.left || this.key.right)
        this.mouseMoved();

    if($.upgrades.auto.active && $.states.frames.count - this.lastShoot >= 3)
        this.click();
}

Player.prototype.draw = function() {

    // Canhão
    p.noStroke();
    p.translate(this.x, this.y);
    p.rotate(this.direction);
    if($.states.frames.count - this.lastShoot <= 3) {
        p.fill(255, 80);
        p.arc(55, 0, 30, 18, 90, 270, p.CHORD);
        p.fill($.config.baseColor);
        p.strokeWeight(2);
        p.stroke(255, 100);
    }
    if($.upgrades.precision.active) {
        p.fill(255, 50);
        p.rect(-5, 0, 3000, 1);
    }
    p.fill(this.hitStart ? p.color(180, 0, 0) : $.config.baseColor);
    p.rect(-5, -5, 50, 10, 5);
    p.rotate(-this.direction);
    p.translate(-this.x, -(this.y));

    // Corpo
    p.arc(this.x, this.y + 5, this.width, this.height, 180, 0, p.CHORD);

    // Life
    p.fill($.config.secondColor);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textStyle(p.BOLD);
    p.textSize(16);
    p.text(this.life, this.x, this.y - 8);

    // Hit
    if(this.hitStart && $.states.frames.count - this.hitStart < 5) {
        p.fill(255, 0, 0, 150);
        p.rect(0, 0, p.width, p.height);
    }
    else
        this.hitStart = 0;
}

Player.prototype.hit = function() {
    this.hitStart = $.states.frames.count;
}

Player.prototype.click = function() {
    $.sounds.play('sound', 'shoot');

    var b1 = new PlayerBullet();

    if($.upgrades.multi.active) {
        var b2 = new PlayerBullet();
        var b3 = new PlayerBullet();

        b2.direction = b2.direction + 10;
        b3.direction = b3.direction - 10;

        $.appendElement(b2);
        $.appendElement(b3);
    }
    
    $.appendElement(b1);

    this.lastShoot = $.states.frames.count;
}

Player.prototype.keyPressed = function(k) {
    this.directionFactor = 0;

    switch(k) {
        case p.LEFT_ARROW:
            this.key.left = true;
            break;

        case p.RIGHT_ARROW:
            this.key.right = true;
            break;

        case 32:
            this.key.space = true;
            this.click();
            break;
    }
}

Player.prototype.keyReleased = function(k) {
    switch(k) {
        case p.LEFT_ARROW:
            this.key.left = false;
            break;

        case p.RIGHT_ARROW:
            this.key.right = false;
            break;

        case 32:
            this.key.space = false;
            break;
    }
}

Player.prototype.mouseMoved = function() {
    this.directionFactor = this.directionFactor + 0.2;
    this.direction = this.key.left
        ? this.direction - p.constrain(this.directionFactor, 0, 10)
        : this.key.right
            ? this.direction + p.constrain(this.directionFactor, 0, 10)
            : p.atan2(p.mouseY - this.y, p.mouseX - this.x);

    this.direction = this.direction % 360;
    if (this.direction < 0)
        this.direction += 360;

    this.direction =
        this.direction < 180
            ? this.direction <= 90 || this.direction == 0
                ? 0
                : 180
            : this.direction;
}

Player.prototype.die = function() {
    $.contexts.change('gameOver');
}