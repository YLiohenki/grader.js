/*! Grader v0.0.1 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function Grader(options) {
    this.element = options.element;
    this.backgroundImage = options.backgroundImage;
    this.gradientType = options.gradientType || 'linear'; //radial or linear
    this.gradientOrigin = options.gradientOrigin || 'circle closest-side';
    this.activeState = null;
    this.defaultState = 'default-state';
    this.states = options.states;
    this.stateTransitionSpeed = options.stateTransitionSpeed || 5000;
    this.animationStep = options.animationStep;

    this.paused = false;
    this.refreshIntervalId = null;
    this.stopedAtTimeStamp = null;
    this.gradients = null;
    this.speed = null;
    this.step = 0;

    this.changeState(this.defaultState);

    this.previousStepTimeStamp = Date.now();

    this.resume();
}

Grader.prototype.updateGradient = require('./updateGradient.js');
Grader.prototype.changeState = require('./changeState.js');
Grader.prototype.resume = require('./resume.js');
Grader.prototype.pause = require('./pause.js');

module.exports = Grader;

},{"./changeState.js":2,"./pause.js":3,"./resume.js":4,"./updateGradient.js":5}],2:[function(require,module,exports){
'use strict';

module.exports = function(state) {
    var _this = this;
    var nextColors, colorDiff;

    if (this.activeState === state) {
        return;
    }

    this.workingState = this.states[state];

    this.gradients = this.workingState.gradients.map(function(state) {
        return state.map(function(grad) {
            var result = {};
            var colorInt = parseInt(grad.color.substring(1), 16);
            result.red = (colorInt >> 16) & 0xFF;
            result.green = (colorInt >> 8) & 0xFF;
            result.blue = colorInt & 0xFF;
            result.size = grad.size || grad.size == 0 ? grad.size : 1;
            return result;
        });
    });

    this.speed = this.workingState.transitionSpeed || this.stateTransitionSpeed;
    this.step = 0;
    this.previousStepTimeStamp = Date.now();

    // Setting the good properties for the transition
    /*if (!this.isPaused) {
        this.isPaused = true;
        this.pause();
    }


    this.activeState = state;
    this.resume();*/
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function()
{
  this.paused = true;
  this.stopedAtTimeStamp = Date.now();
  clearInterval(this.refreshIntervalId);
}

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function()
{
  this.paused = false;
  if (this.stopedAtTimeStamp)
  {
    this.previousStepTimeStamp = Date.now() - (this.stopedAtTimeStamp - this.previousStepTimeStamp);
    this.stopedAtTimeStamp = null;
  }
  var that = this;
  this.refreshIntervalId = setInterval(this.updateGradient.bind(that), this.animationStep || 200);
}

},{}],5:[function(require,module,exports){
'use strict';

module.exports = function() {
    if ($ === undefined) return;

    var currentTimeStamp = Date.now();

    if (currentTimeStamp - this.previousStepTimeStamp >= this.speed) {
        this.step += 1;
        this.previousStepTimeStamp = currentTimeStamp;
        if (this.step == this.gradients.length - 1 && !this.workingState.loop) //if it isn't looping, stay on last gradient, not first
        {
            clearInterval(this.refreshIntervalId);
            return;
        }
    }

    var substep = (currentTimeStamp - this.previousStepTimeStamp) / this.speed; //from 0 to 1

    if (this.step >= this.gradients.length) {
        this.step = 0;
    }

    var prevGradient = this.gradients[this.step];
    var nextGradient = this.gradients[this.step + 1 < this.gradients.length ? this.step + 1 : 0];

    var c0_r = prevGradient[0].red * (1 - substep) + nextGradient[0].red * substep; //color0 red
    var c0_g = prevGradient[0].green * (1 - substep) + nextGradient[0].green * substep;
    var c0_b = prevGradient[0].blue * (1 - substep) + nextGradient[0].blue * substep;
    var c0_s = prevGradient[0].size * (1 - substep) + nextGradient[0].size * substep; //color0 size

    var c1_r = prevGradient[1].red * (1 - substep) + nextGradient[1].red * substep; //color1 red
    var c1_g = prevGradient[1].green * (1 - substep) + nextGradient[1].green * substep;
    var c1_b = prevGradient[1].blue * (1 - substep) + nextGradient[1].blue * substep;
    var c1_s = prevGradient[1].size * (1 - substep) + nextGradient[1].size * substep;
    if (window.debugging) {
        console.log('step:' + this.step + ' substep:' + substep);
        console.log('color1: ' + c0_r + ' ' + c0_g + ' ' + c0_b + ' ' + c0_s);
        console.log('color2: ' + c1_r + ' ' + c1_g + ' ' + c1_b + ' ' + c1_s);
        console.log('');
    }
    var componentToHex = function(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    var rgbToHex = function(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    $(this.element).css({
        background: (this.backgroundImage ? this.backgroundImage + ", " : "") +
            (this.gradientType.toLowerCase() == 'radial' ? "radial" : "linear") + "-gradient(" +
            this.gradientOrigin + ", " + rgbToHex(Math.round(c0_r), Math.round(c0_g), Math.round(c0_b)) +
            " " + Math.round(c0_s * 100) + "%, " +
            rgbToHex(Math.round(c1_r), Math.round(c1_g), Math.round(c1_b)) +
            " " + Math.round(c1_s * 100) + "%)"
    });
};

},{}],6:[function(require,module,exports){
window.Grader = require('./lib/Grader.js');

},{"./lib/Grader.js":1}]},{},[6]);
