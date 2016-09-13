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
