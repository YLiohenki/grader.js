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

    this.paused = false;
    this.refreshIntervalId = null;
    this.stopedAtTimeStamp = null;
    this.gradients = null;
    this.speed = null;
    this.step = 0;

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

module.exports = Grader;
