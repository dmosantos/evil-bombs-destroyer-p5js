/* CONTEXTS */
function Contexts() {
    this.current = 'preload';
    this.changeTo;
}

Contexts.prototype.show = function(context) {
    this.current = context;
    this[this.current].show();
}

Contexts.prototype.change = function(context) {
    this.changeTo = context;
}

Contexts.prototype.update = function() {
    if(this.changeTo) {
        this.show(this.changeTo);
        this.changeTo = null;
    }

    if(this[this.current] && this[this.current].update)
        this[this.current].update();
}

// Logos
Contexts.prototype.logos = {
    show: function() {
        $.states.frames.start = $.states.frames.count;
        $.by.contexts.current = 'logos';

        $.appendElement(new Logos());
    }
}

// Tela inicial
Contexts.prototype.homeScreen = {
    show: function() {
        $.states.frames.start = $.states.frames.count;
        $.by.contexts.current = 'homeScreen';

        $.sounds.play('music', 'music_is_this_love', {
            setLoop: true
        });

        $.appendElement(new HomeScreen());
    }
}

// Gameplay
Contexts.prototype.gamePlay = {
    show: function() {
        $.states.frames.start = $.states.frames.count;
        $.by.contexts.current = 'gamePlay';
        $.states.points = 0;
        $.states.enemyMaxLife = 10;
        $.upgrades.reset();

        //$.sounds.stop('music', 'music_is_this_love');
        //$.sounds.stop('music', 'music_eternity');
        //$.sounds.play('music', 'music_eternity', {
        //    setLoop: true
        //});
        $.sounds.play('sound', 'seek_and_destroy');

        $.appendElement(new Ground());
        $.appendElement(new Placar());
        //$.appendElement(new BtnSound());
        $.appendElement(new BtnPause());
        $.appendElement(new BtnPowerUpAuto());
        $.appendElement(new BtnPowerUpMulti());
        $.appendElement(new BtnPowerUpPrecision());
        $.appendElement(new BtnPowerUpBounce());
        //$.appendElement(new BtnPowerUpMissiles());
        $.appendElement(new Player());
    },
    update: function() {
        if($.states.frames.count % 120 == 0 && $.elements.Player)
            $.appendElement(new EnemyBomb());

        var newEnemyMaxLife = 10 + p.floor(($.states.frames.count - $.states.frames.start) / 1000);
        if(newEnemyMaxLife != $.states.enemyMaxLife) {
            $.states.enemyMaxLife = newEnemyMaxLife;
            $.sounds.play('sound', 'alarm');
            
            var enemyBomb = new EnemyBomb2();
            enemyBomb.life = newEnemyMaxLife;
            $.appendElement(enemyBomb);
        }

        if(!$.elements.Player)
            $.contexts.show('gameOver');
    }
}

// Game Over
Contexts.prototype.gameOver = {
    show: function() {
        $.states.frames.start = $.states.frames.count;
        $.by.contexts.current = 'gameOver';

        $.sounds.play('sound', 'game_over');

        Object.keys($.by.contexts.gamePlay).forEach(function(layer) {
            Object.keys($.by.contexts.gamePlay[layer]).forEach(function(id) {
                $.by.contexts.gamePlay[layer][id].dead = true;
            });
        });

        $.appendElement(new GameOver());
    }
}