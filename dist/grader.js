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
    this.stateTransitionSpeed = options.stateTransitionSpeed || 2000;
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
    if (this.activeState === state) {
        return;
    }

    var hereOldActiveState = !!this.activeState;

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

    if (!this.paused) {
        this.pause();
    }

    if (!hereOldActiveState) {
        this.activeState = state;
        this.previousStepTimeStamp = Date.now();
        return;
    }

    this.isChangingState = true;
    this.previousStepTimeStamp = Date.now();
    this.oldStateGradient = [this.firstColor, this.secondColor];
    var that = this;
    var changeStateIntervalId = setInterval(this.updateGradient.bind(that), this.animationStep || 200);

    setTimeout(function() {
        that.activeState = state;
        that.isChangingState = false;
        clearInterval(changeStateIntervalId);
        this.previousStepTimeStamp = Date.now();
        this.step = 0;
        that.resume();
    }, this.stateTransitionSpeed);
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

    if (!this.isChangingState && currentTimeStamp - this.previousStepTimeStamp >= this.speed) {
        this.step += 1;
        this.previousStepTimeStamp = currentTimeStamp;
        if (this.step == this.gradients.length - 1 && !this.workingState.loop) //if it isn't looping, stay on last gradient, not first
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

    this.firstColor = {};
    this.firstColor.red = prevGradient[0].red * (1 - substep) + nextGradient[0].red * substep; //color0 red
    this.firstColor.green = prevGradient[0].green * (1 - substep) + nextGradient[0].green * substep;
    this.firstColor.blue = prevGradient[0].blue * (1 - substep) + nextGradient[0].blue * substep;
    this.firstColor.size = prevGradient[0].size * (1 - substep) + nextGradient[0].size * substep; //color0 size

    this.secondColor = {};
    this.secondColor.red = prevGradient[1].red * (1 - substep) + nextGradient[1].red * substep; //color1 red
    this.secondColor.green = prevGradient[1].green * (1 - substep) + nextGradient[1].green * substep;
    this.secondColor.blue = prevGradient[1].blue * (1 - substep) + nextGradient[1].blue * substep;
    this.secondColor.size = prevGradient[1].size * (1 - substep) + nextGradient[1].size * substep;

    if (window.debugging) {
        console.log('step:' + this.step + ' substep:' + substep);
        console.log('color1: ' + firstColor.red + ' ' + firstColor.green + ' ' + firstColor.blue + ' ' + firstColor.size);
        console.log('color2: ' + secondColor.red + ' ' + secondColor.green + ' ' + secondColor.blue + ' ' + secondColor.size);
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
            this.gradientOrigin + ", " +
            rgbToHex(Math.round(this.firstColor.red), Math.round(this.firstColor.green), Math.round(this.firstColor.blue)) +
            " " + Math.round(this.firstColor.size * 100) + "%, " +
            rgbToHex(Math.round(this.secondColor.red), Math.round(this.secondColor.green), Math.round(this.secondColor.blue)) +
            " " + Math.round(this.secondColor.size * 100) + "%)"
    });
};

},{}],6:[function(require,module,exports){
window.Grader = require('./lib/Grader.js');

},{"./lib/Grader.js":1}]},{},[6]);
