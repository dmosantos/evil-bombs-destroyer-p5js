function Logos() {
	Element.call(this);
    var self = this;

	this.type = 'Logos';
	this.id = this.type;

    this.animation = (new Animation(this, {
        duration: 2000,
        loop: false,
        ease: 'easeOutQuint',
        mode: 'FRAMERATE',
        keyframes: {
            0: {
                alpha: 0,
                size: 1.5
            },
            100: {
                alpha: 255,
                size: 1
            }
        },
        onComplete: function() {
            self.animation = (new Animation(self, {
                duration: 1000,
                loop: false,
                ease: 'easeInQuint',
                mode: 'FRAMERATE',
                keyframes: {
                    0: {
                        alpha: 255,
                        size: 1
                    },
                    100: {
                        alpha: 0,
                        size: 0.9
                    }
                },
                onComplete: function() {
                    setTimeout(function() {
                        $.contexts.change('homeScreen');
                    }, 100);
                }
            })).start();
        }
    })).start();
}

Logos.prototype = new Element();

Logos.prototype.update = function() {
    this.x = p.width / 2;
    this.y = p.height / 2;
    this.width = p.width;
	this.height = p.height;
}

Logos.prototype.draw = function() {
    p.translate(this.x, this.y);
    p.imageMode(p.CENTER);

    p.tint(255, this.animation.get('alpha'));
	p.image($.images.files.logo_estudio_nos,
        0,
        0,
        $.images.files.logo_estudio_nos.width * this.animation.get('size'),
        $.images.files.logo_estudio_nos.height * this.animation.get('size')
    );
}