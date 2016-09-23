'use strict';

module.exports = function() {
	var currentColors = [this.firstColor, this.secondColor];
	var colorsAverage = [];
	var gradientAverage = null;
	var lightnessAverage;

	currentColors.forEach(function(el, i, arr) {
		colorsAverage.push(
			Math.max(el.red, el.green, el.blue)
		)
	});

	colorsAverage.forEach(function(el, i, arr) {
		// Add all the average lightness of each color
		gradientAverage = gradientAverage === null ?
			el :
			gradientAverage + el;

		if (i === colorsAverage.length - 1) {
			// if it's the last lightness average
			// divide it by the total length to
			// have the global average lightness
			lightnessAverage = Math.round(gradientAverage / (i + 1));
		}
	});
	var lightness = lightnessAverage >= 128 ? 'light' : 'dark';
	if (this.callbacks && this.callbacks.onLightnessChange && this.lightness != lightness)
	{
		this.callbacks.onLightnessChange({ name: this.name, state: lightness});
	}
	this.lightness = lightness
	return this.lightness;
};
