/* UPGRADES */
function Upgrades() {
    this.auto = null;
    this.multi = null;
    this.precision = null;
    this.bounce = null;
    //this.missiles = null;
}

Upgrades.prototype.reset = function() {
    this.auto = {
        name: 'Auto-fire',
        label: 61561,
        active: false,
        duration: {
            1: 300,
            2: 400,
            3: 500,
            4: 600,
            5: 700
        },
        enable: false,
        start: 0,
        energy: 0,
        full: {
            1: 100,
            2: 120,
            3: 140,
            4: 160,
            5: 200
        },
        level: 0,
        xp: 0,
        nextLevel: {
            0: 15,
            1: 100,
            2: 200,
            3: 350,
            4: 500
        }
    }
    this.multi = {
        name: 'Multi Bullet',
        label: 61920,
        active: false,
        duration: {
            1: 300,
            2: 400,
            3: 500,
            4: 600,
            5: 700
        },
        enable: false,
        start: 0,
        energy: 0,
        full: {
            1: 200,
            2: 220,
            3: 240,
            4: 260,
            5: 300
        },
        level: 0,
        xp: 0,
        nextLevel: {
            0: 15,
            1: 100,
            2: 200,
            3: 350,
            4: 500
        }
    }
    this.precision = {
        name: 'Precision Bullet',
        label: 61531,
        active: false,
        duration: {
            1: 300,
            2: 400,
            3: 500,
            4: 600,
            5: 700
        },
        enable: false,
        start: 0,
        energy: 0,
        full: {
            1: 150,
            2: 170,
            3: 190,
            4: 210,
            5: 230
        },
        level: 0,
        xp: 0,
        nextLevel: {
            0: 15,
            1: 100,
            2: 200,
            3: 350,
            4: 500
        }
    }
    this.bounce = {
        name: 'Bounced Bullet',
        label: 61618,
        active: false,
        duration: {
            1: 300,
            2: 400,
            3: 500,
            4: 600,
            5: 700
        },
        enable: false,
        start: 0,
        energy: 0,
        full: {
            1: 300,
            2: 320,
            3: 340,
            4: 360,
            5: 400
        },
        level: 0,
        xp: 0,
        nextLevel: {
            0: 15,
            1: 100,
            2: 200,
            3: 350,
            4: 500
        }
    }
    /*this.missiles = {
        name: 'Missiles',
        label: 61749,
        active: false,
        duration: {
            1: 300,
            2: 400,
            3: 500,
            4: 600,
            5: 700
        },
        enable: false,
        start: 0,
        energy: 0,
        full: {
            1: 500,
            2: 520,
            3: 540,
            4: 560,
            5: 600
        },
        level: 0,
        xp: 0,
        nextLevel: {
            0: 15,
            1: 100,
            2: 200,
            3: 350,
            4: 500
        }
    }*/
}

Upgrades.prototype.update = function(name) {
    if(this[name].active && ($.states.frames.count - this[name].start) > this[name].duration[this[name].level]) {
        this[name].active = false;
        this[name].enable = false;
        this[name].energy = 0;
    }
}

Upgrades.prototype.activate = function(name) {
    if(this[name].enable && !this[name].active && this[name].level) {
        this[name].active = true;
        this[name].start = $.states.frames.count;
        $.sounds.stop('sound', 'upgrade_start');
        $.sounds.play('sound', 'upgrade_start');
    }
}

Upgrades.prototype.addEnergy = function(name, value) {
    if(this[name].level) {
        if(!this[name].enable)
            this[name].energy = this[name].energy + value;

        if(!this[name].enable && this[name].energy >= this[name].full[this[name].level]) {
            this[name].energy = this[name].full[this[name].level];
            this[name].enable = true;
            $.appendElement(new Message(this[name].name + '\nREADY!'));
            $.sounds.play('sound', 'upgrade_ready');
        }
    }
}

Upgrades.prototype.addXP = function(name, value) {
    if(this[name].level < 5) {
        this[name].xp = this[name].xp + value;

        if(this[name].xp >= this[name].nextLevel[this[name].level]) {
            this[name].level++;
            $.appendElement(new Message(this[name].name + '\nLEVEL ' + (this[name].level < 5 ? 'UP' : 'MAX') + '!'));
            $.sounds.play('sound', 'upgrade_level_up');
            if(this[name].level == 5)
                this[name].xp = this[name].nextLevel[this[name].level - 1];
            else
                this[name].xp = 0;
        }

    }
}