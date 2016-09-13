'use strict';

module.exports = function(state) {
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

    if (!this.paused) {
        this.pause();
    }

    this.isChangingState = true;
    var that = this;
    var changeStateIntervalId = setInterval(this.updateGradient.bind(that), this.animationStep || 200);
    this.isChangingState = false;

    setTimeout(function() {
        this.activeState = state;
        clearInterval(changeStateIntervalId);
        this.resume();
    }, this.stateTransitionSpeed + (this.animationStep || 200));
};
