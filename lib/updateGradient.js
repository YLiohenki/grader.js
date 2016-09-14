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
