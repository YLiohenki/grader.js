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
