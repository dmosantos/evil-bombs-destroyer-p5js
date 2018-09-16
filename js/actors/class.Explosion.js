function Explosion(parent) {
	Element.call(this);

	this.type = 'Explosion';
	this.id = this.type + '_' + newId();
	this.layer = 20;

	this.x = parent.x;
	this.y = parent.y;
	this.diameter = 100;

	this.animation = (new Animation(this, {
		duration: 500,
		//liveUpdate: true,
		ease: 'easeOutQuad',
		keyframes: {
			0: {
				diameter: 0,
				stroke: 0,
				alpha: 255
			},
			50: {
				diameter: 40,
				stroke: 40,
				alpha: 200
			},
			80: {
				diameter: 85,
				stroke: 20,
				alpha: 100
			},
			100: {
				diameter: 100,
				stroke: 0,
				alpha: 0
			}
		}
	})).start();

	$.sounds.play('sound', 'explosion_' + p.round(p.random(1, 4)));
	$.appendElement(new HitParticles(this));
}

Explosion.prototype = new Element();

Explosion.prototype.update = function() {
	if(this.animation.framesElapsed < 5) {
		$.states.background.active = 'light';
		$.config.baseColor = p.color(100);
	}
	else {
		$.states.background.active = 'base';
		$.config.baseColor = p.color(0);
	}

	this.dead = this.animation.isRunning === false;
}

Explosion.prototype.draw = function() {
    p.stroke(0, this.animation.get('alpha'));
	p.strokeWeight(this.animation.get('stroke'));
	p.noFill();
	p.ellipse(this.x, this.y, this.animation.get('diameter'), this.animation.get('diameter'));
}