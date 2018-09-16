/* HELPERS */
function mute() {
	$.sounds.config.sound.setVolume = 0;
	$.sounds.config.music.setVolume = 0;
	$.sounds.applyConfig();
}

function unmute() {
	$.sounds.config.sound.setVolume = 1;
	$.sounds.config.music.setVolume = 1;
	$.sounds.applyConfig();
}

function newId() {
	return typeof p.random != 'undefined' ? String(parseInt(p.random(1000000000, 9999999999))) + '_' + String(parseInt(p.millis())) : String((new Date()).getMilliseconds());
}

function getPoint(mx, my, cx, cy, angle) {

    var x, y, dist, diffX, diffY, ca, na;

    /// get distance from center to point
    diffX = cx - mx;
    diffY = cy - my;
    dist = Math.sqrt(diffX * diffX + diffY * diffY);

    /// find angle from pivot to corner
    ca = Math.atan2(diffY, diffX) * 180 / Math.PI;

    /// get new angle based on old + current delta angle
    na = ((ca + angle) % 360) * Math.PI / 180;

    /// get new x and y and round it off to integer
    x = (mx + dist * Math.cos(na) + 0.5)|0;
    y = (my + dist * Math.sin(na) + 0.5)|0;

    return {x:x, y:y};
}

function angleBetween(p1x, p1y, p2x, p2y) {
    return p.atan2(p2y - p1y, p2x - p1x);
}

function setGradient(x, y, w, h, c1, c2, axis) {
    p.noFill();

    if (axis == 1) {  // Top to bottom gradient
        for (var i = y; i <= y+h; i++) {
            var inter = p.map(i, y, y+h, 0, 1);
            var c = p.lerpColor(c1, c2, inter);
            p.stroke(c);
            p.line(x, i, x+w, i);
        }
    }  
    else if (axis == 2) {  // Left to right gradient
        for (var i = x; i <= x+w; i++) {
            var inter = p.map(i, x, x+w, 0, 1);
            var c = p.lerpColor(c1, c2, inter);
            p.stroke(c);
            p.line(i, y, i, y+h);
        }
    }
}

var EasingFunctions = {
    linear: function (t) { return t },
    easeInQuad: function (t) { return t*t },
    easeOutQuad: function (t) { return t*(2-t) },
    easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
    easeInCubic: function (t) { return t*t*t },
    easeOutCubic: function (t) { return (--t)*t*t+1 },
    easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
    easeInQuart: function (t) { return t*t*t*t },
    easeOutQuart: function (t) { return 1-(--t)*t*t*t },
    easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
    easeInQuint: function (t) { return t*t*t*t*t },
    easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
    easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}

function l(x) {
    console.log(x);
}
function t(x) {
    console.table(x);
}
function p(color) {
	p.fill(255);
	p.stroke(0);

    p.arc(0, 0, 10, 10, 360, 0, CHORD);
}

function wallBounce(directionAngle, wallAngle) {
    wallAngle = wallAngle % 360;
    if(wallAngle < 0)
        wallAngle += 360;

    directionAngle = directionAngle % 360;
    if(directionAngle < 0)
        directionAngle += 360;

    var wallDiff = 360 - wallAngle;
    wallAngle = 0;

    directionAngle = (directionAngle + wallDiff) % 360;

    var bouncedAngle = directionAngle - ((directionAngle - 180) * 2);

    var r = (bouncedAngle - wallDiff) % 360;
    if(r < 0)
        r += 360;

    return r;
}

p5.prototype.createCanvas = function(w, h, renderer) {
    var defaultClass = 'p5Canvas';
    var defaultId = 'defaultCanvas';
  p5._validateParameters('createCanvas', arguments);
  //optional: renderer, otherwise defaults to p2d
  var r = renderer || p.P2D;
  var c;

  if (r === p.WEBGL) {
    c = document.getElementById(defaultId);
    /*if (c) {
      //if defaultCanvas already exists
      c.parentNode.removeChild(c); //replace the existing defaultCanvas
      var thisRenderer = this._renderer;
      this._elements = this._elements.filter(function(e) {
        return e !== thisRenderer;
      });
    }*/
    c = document.getElementById('defaultCanvas');
    c.id = defaultId;
    c.classList.add(defaultClass);
  } else {
    if (!this._defaultGraphicsCreated) {
      c = document.getElementById('defaultCanvas');
      var i = 0;
      while (document.getElementById('defaultCanvas' + i)) {
        i++;
      }
      defaultId = 'defaultCanvas' + i;
      c.id = defaultId;
      c.classList.add(defaultClass);
    } else {
      // resize the default canvas if new one is created
      c = this.canvas;
    }
  }

  // set to invisible if still in setup (to prevent flashing with manipulate)
  if (!this._setupDone) {
    c.dataset.hidden = true; // tag to show later
    c.style.visibility = 'hidden';
  }

  //if (this._userNode) {
  //  // user input node case
  //  this._userNode.appendChild(c);
  //} else {
  //  document.body.appendChild(c);
  //}

  // Init our graphics renderer
  //webgl mode
  if (r === p.WEBGL) {
    this._setProperty('_renderer', new p5.RendererGL(c, this, true));
    this._elements.push(this._renderer);
  } else {
    //P2D mode
    if (!this._defaultGraphicsCreated) {
      this._setProperty('_renderer', new p5.Renderer2D(c, this, true));
      this._defaultGraphicsCreated = true;
      this._elements.push(this._renderer);
    }
  }
  this._renderer.resize(w, h);
  this._renderer._applyDefaults();
  return this._renderer;
};