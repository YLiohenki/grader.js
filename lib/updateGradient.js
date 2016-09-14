'use strict';

module.exports = function() {
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
    this.firstColor.red = prevGradient[0].red * (1 - substep) + nextGradient[0].red * substep;
    this.firstColor.green = prevGradient[0].green * (1 - substep) + nextGradient[0].green * substep;
    this.firstColor.blue = prevGradient[0].blue * (1 - substep) + nextGradient[0].blue * substep;
    this.firstColor.size = prevGradient[0].size * (1 - substep) + nextGradient[0].size * substep;
    this.firstColor.opacity = this.getOpacity(prevGradient[0], true) * (1 - substep) + this.getOpacity(nextGradient[0], true) * substep;

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
        "; background:" + imageString + gradientString
    );
    this.element.classList.remove("grader-dark");
    this.element.classList.remove("grader-light");

    this.element.classList.add("grader-" + this.getLightness());
};
