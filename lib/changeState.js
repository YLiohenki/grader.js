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
