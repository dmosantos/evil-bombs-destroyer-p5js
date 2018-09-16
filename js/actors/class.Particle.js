function Particle(parent) {
	Element.call(this);

	this.type = 'Particle';
	this.id = this.type + '_' + newId();
	this.layer = 4;

	this.x = parent.x;
	this.y = parent.y;
	this.diameter = 5;

	this.animation = (new Animation(this, {
		duration: 300,
		ease: 'easeOutQuad',
		keyframes: {
			0: {
				x: this.x,
				y: this.y
			},
			100: {
				x: p.round(p.random(this.x - 80, this.x + 80)),
				y: p.round(p.random(this.y - 80, this.y + 80))
			}
		}
	})).start();

	this.animationAlpha = (new Animation(this, {
		duration: 300,
		ease: 'easeInCubic',
		keyframes: {
			0: {
				alpha: 150
			},
			100: {
				alpha: 0
			}
		}
	})).start();
}

Particle.prototype = new Element();

Particle.prototype.update = function() {
	this.dead = !this.animation.isRunning;
}

Particle.prototype.draw = function() {
	p.noStroke();
	p.fill(0, this.animationAlpha.get('alpha'));
	p.ellipse(this.animation.get('x'), this.animation.get('y'), this.diameter, this.diameter);
}