'use strict';

function Grader(options) {
	this.element = options.element;
  this.backgroundImage = options.backgroundImage;
  this.gradientType = options.gradientType || 'linear'; //radial or linear
	this.gradientOrigin = options.gradientOrigin || 'circle closest-side';
	this.activeState = 'default-state';
	this.states = options.states;
	this.stateTransitionSpeed = options.stateTransitionSpeed || 5000;

	var workingState = this.states[this.activeState];

	var gradients = workingState.gradients.map(function(state)
		{
			return state.map(function(grad)
				{
					var result = {};
					var colorInt = parseInt(grad.color.substring(1),16);
					result.red = (colorInt >> 16) & 0xFF;
					result.green = (colorInt >> 8) & 0xFF;
					result.blue = colorInt & 0xFF;
					result.size = grad.size || grad.size == 0 ? grad.size : 1;
					return result;
				});
		});

		var step = 0;
		var previousStepTimeStamp = Date.now();
		//transition speed
		var gradientSpeed = 0.002;

		function componentToHex(c) {
    	var hex = c.toString(16);
    	return hex.length == 1 ? "0" + hex : hex;
		}

		function rgbToHex(r, g, b) {
    	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}

		function updateGradient()
		{

		  if ( $===undefined ) return;

			var currentTimeStamp = Date.now();

			if (currentTimeStamp - previousStepTimeStamp >= this.stateTransitionSpeed)
			{
				step += 1;
				previousStepTimeStamp = currentTimeStamp;
			}

			var substep = (currentTimeStamp - previousStepTimeStamp) / this.stateTransitionSpeed;//from 0 to 1

			if (step >= gradients.length)
			{
				step = 0;
			}

			var prevGradient = gradients[step];
			var nextGradient = gradients[step + 1 < gradients.length ?  step + 1 : 0];

			var c0_r = prevGradient[0].red * (1 - substep) + nextGradient[0].red * substep;//color0 red
			var c0_g = prevGradient[0].green * (1 - substep) + nextGradient[0].green * substep;
			var c0_b = prevGradient[0].blue * (1 - substep) + nextGradient[0].blue * substep;
			var c0_s = prevGradient[0].size * (1 - substep) + nextGradient[0].size * substep;//color0 size

			var c1_r = prevGradient[1].red * (1 - substep) + nextGradient[1].red * substep;//color1 red
			var c1_g = prevGradient[1].green * (1 - substep) + nextGradient[1].green * substep;
			var c1_b = prevGradient[1].blue * (1 - substep) + nextGradient[1].blue * substep;
			var c1_s = prevGradient[1].size * (1 - substep) + nextGradient[1].size * substep;

			$(this.element).css({
				background: (this.backgroundImage ? this.backgroundImage + ", " : "")
					+ (this.gradientType.toLowerCase() == 'radial' ? "radial": "linear") + "-gradient("
					+ this.gradientOrigin + ", " + rgbToHex(Math.round(c0_r), Math.round(c0_g), Math.round(c0_b))
					+ " " + Math.round(c0_s * 100) + "%, "
					+ rgbToHex(Math.round(c1_r), Math.round(c1_g), Math.round(c1_b))
					+ " " + Math.round(c1_s * 100)  + "%)"});
/*.btn-checked-gradient (@imgUrl: 'Images/All.png', @origin: circle closest-side, @start: #ffffff, @stop: #000000) {
    background-image: url(@imgUrl);
    &.is-checked{
        background-size: 95px 95px;
	    background-image: url(@imgUrl), -webkit-radial-gradient(@origin, @start, @stop 110%);
	    background-image: url(@imgUrl), -moz-radial-gradient(@origin, @start, @stop 110%);
	    background-image: url(@imgUrl), -o-radial-gradient(@origin, @start, @stop 110%);
	    background-image: url(@imgUrl), -ms-radial-gradient(@origin, @start, @stop 110%);
	    background-image: url(@imgUrl), radial-gradient(@origin, @start, @stop 110%);
    }
}*/
		}

		var that = this;
		setInterval(updateGradient.bind(that),200);
}

module.exports = Grader;