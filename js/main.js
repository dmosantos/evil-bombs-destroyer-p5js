var fontAwesome;
var fontBase;
var gameReady = false;

var sketch = function(p5Instance) {
    p = p5Instance;

    p.setup = function() {
        $ = new Core();

        p.soundFormats('mp3');

        var soundFiles = [
            ['music', 'music-is-this-love.mp3'],
            ['sound', 'explosion-1.mp3'],
            ['sound', 'explosion-2.mp3'],
            ['sound', 'explosion-3.mp3'],
            ['sound', 'explosion-4.mp3'],
            ['sound', 'alarm.mp3'],
            ['sound', 'seek-and-destroy.mp3'],
            ['sound', 'shoot.mp3'],
            ['sound', 'hit.mp3'],
            ['sound', 'game-over.mp3'],
            ['sound', 'upgrade-ready.mp3'],
            ['sound', 'upgrade-level-up.mp3'],
            ['sound', 'upgrade-start.mp3']
        ];

        var imageFiles = ['logo-estudio-nos.png'];

        var total = 2 + soundFiles.length + imageFiles.length,
            done = 0;

        soundFiles.forEach(function(file) {
            $.sounds.load(file[0], file[1], ready);
        });

        imageFiles.forEach(function(file) {
            $.images.load(file, ready);
        });

        fontAwesome = p.loadFont('fonts/FontAwesome.otf', ready);
        fontBase = p.loadFont('fonts/RobotoMono-Bold.ttf', ready);

        function ready(x) {
            done++;

            if(done == total) {
                gameReady = true;
                //$.contexts.show('homeScreen');
                $.contexts.show('logos');
            }
        }

        p.createCanvas(p.windowWidth < 1200 ? p.windowWidth : 400, p.windowWidth < 1200 || p.windowHeight < 800 ? p.windowHeight : 800);
        p.angleMode(p.DEGREES);

        if($.data.get('soundConfig'))
            $.sounds.config = $.data.get('soundConfig');
    }

    p.draw = function() {
        p.clear();
        p.background(0);

        if(gameReady) {

            if(!$.states.pause)
                $.states.frames.count++;
            else
                $.states.frames.gap++;

            if($.contexts.current == 'gamePlay')
                setGradient(0, 0, p.width, p.height, $.states.background.get[$.states.background.active].topColor, $.states.background.get[$.states.background.active].bottomColor, 1);

            if(typeof $.by.contexts[$.by.contexts.current] != 'undefined') {
                Object.keys($.by.contexts[$.by.contexts.current]).forEach(function(layer) {
                    Object.keys($.by.contexts[$.by.contexts.current][layer]).forEach(function(id) {
                        if(!$.states.pause || $.by.contexts[$.by.contexts.current][layer][id].updateOnPause)
                            $.by.contexts[$.by.contexts.current][layer][id]._update();
                        p.push();
                        p.textFont(fontBase);
                        $.by.contexts[$.by.contexts.current][layer][id]._draw();
                        p.pop();
                    });
                });

                Object.keys($.elements).forEach(function(id) {
                    if($.elements[id].dead) {
                        delete $.by.contexts[$.elements[id].context][$.elements[id].layer][id];
                        delete $.by.types[$.elements[id].type][id];
                        delete $.elements[id];
                    }
                });
            }

            if(!$.states.pause)
                $.contexts.update();

        } else {
            p.fill(0);
            p.rect(0, 0, p.width, p.height);
            p.fill(255);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(18);
            p.text('LOADING...', p.width / 2, p.height / 2);
        }
    }

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth < 1200 ? p.windowWidth : 400, p.windowWidth < 1200 || p.windowHeight < 800 ? p.windowHeight : 800);
    }

    p.mousePressed = function(e) {
        if($)
            $.events.trigger('mouseMoved');
        fire(e.type);
    }

    p.touchStarted = function(e) {
        if($) {
            $.events.trigger('mouseMoved');
            fire(e.type);
        }
    }

    p.mouseMoved = function() {
        if($)
            $.events.trigger('mouseMoved');
    }

    p.touchMoved = function() {
        if($)
            $.events.trigger('mouseMoved');
    }

    p.keyPressed = function() {
        if($)
            $.events.trigger('keyPressed', p.keyCode);
    }

    p.keyReleased = function() {
        if($)
            $.events.trigger('keyReleased', p.keyCode);
    }

    function fire(type) {
        if(!$.states.firstEventType)
            $.states.firstEventType = type;

        if($.states.firstEventType == type)
            $.events.trigger('click');
    }
};

document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady(){
    var ebdP5 = new p5(sketch);
}

if(typeof document.deviceready == 'undefined')
    onDeviceReady();

/*// Foco na janela
if (window.addEventListener)
    window.addEventListener('load', onLoad, false);
else if (window.attachEvent)
    window.attachEvent('onload', onLoad);

function onLoad() {
    //l('onLoad');
    document.addEventListener("deviceready", onDeviceReady, false);
}

// device APIs are available
//
function onDeviceReady() {
    //l('onDeviceReady');
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
}

function onPause() {
    //l('onPause');
    noLoop();
    mute();
}

function onResume() {
    //l('onResume');
    loop();
    if(!$.data.get('mute'))
        unmute();
}*/