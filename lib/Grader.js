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
