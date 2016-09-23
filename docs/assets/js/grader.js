/*! Grader v0.0.1 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function Grader(options) {
    this.element = document.querySelector(options.element);
    this.backgroundImage = options.backgroundImage;
    this.gradientType = options.gradientType || 'linear'; //radial or linear
    this.gradientOrigin = options.gradientOrigin || 'circle closest-side';
    this.activeState = null;
    this.defaultState = 'default-state';
    this.states = options.states;
    this.stateTransitionSpeed = options.stateTransitionSpeed || 2000;
    this.animationStep = options.animationStep;
    this.opacity = options.opacity;
    this.isPausedWhenNotInView = options.isPausedWhenNotInView === false ? false : true;//default true
    this.pauseWhenTabIsntActive = options.pauseWhenTabIsntActive || false;//default false
    this.applyToText = !!options.applyToText;
    this.name = options.name;
    this.emitEvents = !!options.emitEvents;

    this.paused = false;
    this.refreshIntervalId = null;
    this.stopedAtTimeStamp = null;
    this.gradients = null;
    this.speed = null;
    this.step = 0;
    this.callbacks = options.callbacks ? {
      onStart: typeof options.callbacks.onStart === 'function' ? options.callbacks.onStart : false,
      onGradientChange: typeof options.callbacks.onGradientChange === 'function' ?
        options.callbacks.onGradientChange :
        false,
      onEnd: typeof options.callbacks.onEnd === 'function' ? options.callbacks.onEnd : false,
      onLightnessChange: typeof options.callbacks.onLightnessChange === 'function' ?
       options.callbacks.onLightnessChange : false
    } : null;

    this.changeState(this.defaultState);
    this.previousStepTimeStamp = Date.now();
    this.resume();
    if (this.isPausedWhenNotInView != false) {
        this.pauseWhenNotInView();
    }
    if (this.pauseWhenTabIsntActive) {
        this.pauseWhenTabIsntActive();
    }
}

Grader.prototype.updateGradient = require('./updateGradient.js');
Grader.prototype.changeState = require('./changeState.js');
Grader.prototype.resume = require('./resume.js');
Grader.prototype.pause = require('./pause.js');
Grader.prototype.getOpacity = require('./getOpacity.js');
Grader.prototype.getLightness = require('./getLightness.js');
Grader.prototype.pauseWhenNotInView = require('./pauseWhenNotInView.js');
Grader.prototype.pauseWhenTabIsntActive = require('./pauseWhenTabIsntActive.js');
Grader.prototype.eventPolyfill = require('./eventPolyfill.js');

module.exports = Grader;

},{"./changeState.js":2,"./eventPolyfill.js":3,"./getLightness.js":4,"./getOpacity.js":5,"./pause.js":6,"./pauseWhenNotInView.js":7,"./pauseWhenTabIsntActive.js":8,"./resume.js":9,"./updateGradient.js":10}],2:[function(require,module,exports){
'use strict';

module.exports = function(state) {
    if (this.activeState === state && !this.isChangingState) {
        return;
    }

    var itsInitialChangeState = !this.activeState;

    this.workingState = this.states[state];

    this.gradients = this.workingState.gradients.map(function(state) {
        var size = 0;
        return state.map(function(grad) {
            var result = {};
            var colorInt;
            if (typeof grad == "string") {
                colorInt = parseInt(grad.substring(1), 16);
            } else {
                colorInt = parseInt(grad.color.substring(1), 16);
            }
            result.red = (colorInt >> 16) & 0xFF;
            result.green = (colorInt >> 8) & 0xFF;
            result.blue = colorInt & 0xFF;
            result.size = grad.size || grad.size == 0 ? grad.size : size;
            result.opacity = grad.opacity;
            ++size;
            return result;
        });
    });

    if (!this.paused) {
        this.pause();
    }

    if (itsInitialChangeState) {
        this.activeState = state;
        this.previousStepTimeStamp = Date.now();
        this.speed = this.workingState.transitionSpeed || this.stateTransitionSpeed;
        this.isChangingState = false;

        if (this.callbacks && this.callbacks.onStart) {
            this.callbacks.onStart({
                name: this.name
            });
        }
        return;
    }

    if (this.changeStateIntervalId) {
        clearInterval(this.changeStateIntervalId);
        this.changeStateIntervalId = null;
    }
    this.isChangingState = true;
    this.step = 0;
    this.previousStepTimeStamp = Date.now();
    this.oldStateGradient = [this.firstColor, this.secondColor];
    this.changeStateIntervalId = setInterval(this.updateGradient.bind(this), this.animationStep || 200);
    if (this.changeStateTimeout) {
        clearTimeout(this.changeStateTimeout);
        this.changeStateTimeout = null;
    }

    this.changeStateTimeout = setTimeout(function() {
        this.activeState = state;
        this.isChangingState = false;
        if (this.changeStateIntervalId)
            clearInterval(this.changeStateIntervalId);
        this.changeStateIntervalId = null;
        this.changeStateTimeout = null;
        this.previousStepTimeStamp = Date.now();
        this.stopedAtTimeStamp = Date.now();
        this.step = 0;
        this.speed = this.workingState.transitionSpeed || this.stateTransitionSpeed;
        this.resume();
    }.bind(this), this.stateTransitionSpeed + this.animationStep);
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function() {
	if ( typeof window.CustomEvent === "function" ) return;

	function CustomEvent (event, params) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;

	window.CustomEvent = CustomEvent;
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function() {
	var currentColors = [this.firstColor, this.secondColor];
	var colorsAverage = [];
	var gradientAverage = null;
	var lightnessAverage;

	currentColors.forEach(function(el, i, arr) {
		colorsAverage.push(
			Math.max(el.red, el.green, el.blue)
		)
	});

	colorsAverage.forEach(function(el, i, arr) {
		// Add all the average lightness of each color
		gradientAverage = gradientAverage === null ?
			el :
			gradientAverage + el;

		if (i === colorsAverage.length - 1) {
			// if it's the last lightness average
			// divide it by the total length to
			// have the global average lightness
			lightnessAverage = Math.round(gradientAverage / (i + 1));
		}
	});
	var lightness = lightnessAverage >= 128 ? 'light' : 'dark';
	if (this.callbacks && this.callbacks.onLightnessChange && this.lightness != lightness)
	{
		this.callbacks.onLightnessChange({ name: this.name, state: lightness});
	}
	this.lightness = lightness
	return this.lightness;
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = function(color, isFirstColor) {
    var prev = color.opacity;
    if (prev || prev == 0)
        return prev;
    prev = (typeof this.workingState.opacity === 'object' ? this.workingState.opacity[isFirstColor ? 0 : 1] : null);
    if (prev || prev == 0)
        return prev;
    prev = this.workingState.opacity;
    if (prev || prev == 0)
        return prev;
    prev = (typeof this.opacity === 'object' ? this.opacity[isFirstColor ? 0 : 1] : null);
    if (prev || prev == 0)
        return prev;
    prev = this.opacity;
    if (prev || prev == 0)
        return prev;
    prev = 1;
    return prev;
}

},{}],6:[function(require,module,exports){
'use strict';

module.exports = function() {
    if (this.paused)
        return;
    this.paused = true;
    this.stopedAtTimeStamp = Date.now();
    clearInterval(this.refreshIntervalId);
    this.refreshIntervalId = null;
}

},{}],7:[function(require,module,exports){
'use strict';

module.exports = function() {
    var timeout;

    var pauseWhenNotInView = function(init) {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(function() {
            var rect = this.element.getBoundingClientRect();
            var isNotInView =
                rect.bottom < 0 ||
                rect.right < 0 ||
                rect.left > window.innerWidth ||
                rect.top > window.innerHeight;

            if (isNotInView) {
                if (!this.isPaused && !this.isPausedBecauseNotInView) {
                    this.isPausedBecauseNotInView = true;
                    this.pause('isPausedBecauseNotInView');
                }
            } else {
                if (!this.isPaused || init === true) {
                    this.isPausedBecauseNotInView = false;
                    this.resume('isPausedBecauseNotInView');
                }
            }
        }.bind(this), 300);
    }.bind(this);

    window.addEventListener('scroll', pauseWhenNotInView);
    pauseWhenNotInView(true);
};

},{}],8:[function(require,module,exports){
'use strict';

module.exports = function() {

    var timeoutFocus;

    window.addEventListener("focus", function(event) {
        console.log('focus');
        if (timeoutFocus)
            clearTimeout(timeoutFocus);
        timeoutFocus = setTimeout(function() {
            this.resume();
        }.bind(this), 300);
    }, false);
    window.addEventListener("blur", function(event) {
        console.log('blur');
        this.pause();
    }.bind(this), false);
};

},{}],9:[function(require,module,exports){
'use strict';

module.exports = function()
{
  if (!this.paused)
      return;
  this.paused = false;
  if (this.stopedAtTimeStamp)
  {
    this.previousStepTimeStamp = Date.now() - (this.stopedAtTimeStamp - this.previousStepTimeStamp);
    this.stopedAtTimeStamp = null;
  }
  this.refreshIntervalId = setInterval(this.updateGradient.bind(this), this.animationStep || 200);
}

},{}],10:[function(require,module,exports){
'use strict';

module.exports = function() {
    var currentTimeStamp = Date.now();

    if (!this.isChangingState && currentTimeStamp - this.previousStepTimeStamp >= this.speed) {
        this.step += 1;
        this.previousStepTimeStamp = currentTimeStamp;
        if (this.step >= this.gradients.length - 1 && !this.workingState.loop) //if it isn't looping, stay on last gradient, not first
        {
            clearInterval(this.refreshIntervalId);
            return;
        }
    }

    var substep = (currentTimeStamp - this.previousStepTimeStamp) / (this.isChangingState ? this.stateTransitionSpeed : this.speed); //from 0 to 1

    if (this.step >= this.gradients.length) {
        this.step = 0;
    }

    var prevGradient = this.isChangingState ? this.oldStateGradient : this.gradients[this.step];
    var nextGradient = this.isChangingState ? this.gradients[0] : this.gradients[this.step + 1 < this.gradients.length ? this.step + 1 : 0];

    this.oldFirstColor = this.firstColor;
    this.firstColor = {};
    this.firstColor.red = prevGradient[0].red * (1 - substep) + nextGradient[0].red * substep;
    this.firstColor.green = prevGradient[0].green * (1 - substep) + nextGradient[0].green * substep;
    this.firstColor.blue = prevGradient[0].blue * (1 - substep) + nextGradient[0].blue * substep;
    this.firstColor.size = prevGradient[0].size * (1 - substep) + nextGradient[0].size * substep;
    this.firstColor.opacity = this.getOpacity(prevGradient[0], true) * (1 - substep) + this.getOpacity(nextGradient[0], true) * substep;

    this.oldSecondColor = this.secondColor;
    this.secondColor = {};
    var nextGradientSecondColor = nextGradient[1] ? nextGradient[1] : nextGradient[0];
    var prevGradientSecondColor = prevGradient[1] ? prevGradient[1] : prevGradient[0];
    this.secondColor.red = prevGradientSecondColor.red * (1 - substep) + nextGradientSecondColor.red * substep; //color1 red
    this.secondColor.green = prevGradientSecondColor.green * (1 - substep) + nextGradientSecondColor.green * substep;
    this.secondColor.blue = prevGradientSecondColor.blue * (1 - substep) + nextGradientSecondColor.blue * substep;
    this.secondColor.size = prevGradientSecondColor.size * (1 - substep) + nextGradientSecondColor.size * substep;
    this.secondColor.opacity = this.getOpacity(prevGradientSecondColor, false) * (1 - substep) + this.getOpacity(nextGradientSecondColor, false) * substep;

    if (window.debugging) {
        console.log('time:' + Date());
        console.log('step:' + this.step + ' substep:' + substep);
        console.log('color1: ' + this.firstColor.red + ' ' + this.firstColor.green + ' ' + this.firstColor.blue + ' ' + this.firstColor.size + ' ' + this.firstColor.opacity);
        console.log('color2: ' + this.secondColor.red + ' ' + this.secondColor.green + ' ' + this.secondColor.blue + ' ' + this.secondColor.size + ' ' + this.secondColor.opacity);
        console.log('');
    }

    var imageString = (this.backgroundImage ? this.backgroundImage + ", " : " ");
    var gradientString = (this.gradientType.toLowerCase() == 'radial' ? "radial" : "linear") + "-gradient(" +
        this.gradientOrigin + ", " +
        'rgba(' + Math.round(this.firstColor.red) + ', ' + Math.round(this.firstColor.green) + ', ' + Math.round(this.firstColor.blue) +
        ', ' + this.firstColor.opacity + ") " + Math.round(this.firstColor.size * 100) + "%, " +
        'rgba(' + Math.round(this.secondColor.red) + ', ' + Math.round(this.secondColor.green) + ', ' + Math.round(this.secondColor.blue) +
        ', ' + this.secondColor.opacity + ") " + Math.round(this.secondColor.size * 100) + "%)";

    this.element.setAttribute("style",
        "background:" + imageString + "rgba(" + Math.round((this.firstColor.red + this.secondColor.red) / 2) + ', ' + Math.round((this.firstColor.green + this.secondColor.green) / 2) +
        ', ' + Math.round((this.firstColor.blue + this.secondColor.blue) / 2) + ', ' + ((this.firstColor.opacity + this.secondColor.opacity) / 2) + ")" /* For browsers that do not support gradients */ +
        "; background:" + imageString + "-webkit-" + gradientString /* For Safari 5.1 to 6.0 */ +
        "; background:" + imageString + "-o-" + gradientString /* For Opera 11.1 to 12.0 */ +
        "; background:" + imageString + "-moz-" + gradientString /* For Firefox 3.6 to 15 */ +
        "; background:" + imageString + "-ms-" + gradientString /* Just for fun and profit */ +
        "; background:" + imageString + gradientString +
        ((this.workingState.applyToText || (this.workingState.applyToText != false && this.applyToText)) ? ";-webkit-background-clip: text;-webkit-text-fill-color: transparent;" : "")
    );

    this.element.classList.remove("grader-dark");
    this.element.classList.remove("grader-light");

    this.element.classList.add("grader-" + this.getLightness());

    if (this.callbacks && this.callbacks.onGradientChange) {
        this.callbacks.onLightnessChange({
            name: this.name,
            oldFirstColor: this.oldFirstColor,
            oldSecondColor: this.oldSecondColor,
            firstColor: this.firstColor,
            secondColor: this.secondColor
        });
    }

};

},{}],11:[function(require,module,exports){
window.Grader = require('./lib/Grader.js');

},{"./lib/Grader.js":1}]},{},[11]);
