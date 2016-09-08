'use strict';

function Grader(options) {
	this.element = document.querySelector(options.element);
  this.backgroundImage = options.backgroundImage;
  this.gradientType = options.gradientType; //radial or linear
	this.activeState = 'default-state';
	this.events = {
		start: new CustomEvent('grader:start'),
		end: new CustomEvent('grader:end'),
		gradientChange: function(details) {
			return new CustomEvent('grader:gradientChange', {
				detail: {
					isLooping: details.isLooping,
					colorsFrom: details.colorsFrom,
					colorsTo: details.colorsTo,
					activeState: details.activeState
				},
				bubbles: false,
				cancelable: false
			})
		}
	};
	this.callbacks = {
		onStart: typeof options.onStart === 'function' ? options.onStart : false,
		onGradientChange: typeof options.onGradientChange === 'function' ?
			options.onGradientChange :
			false,
		onEnd: typeof options.onEnd === 'function' ? options.onEnd : false
	};

	// Callback and Event
	if (this.callbacks.onStart) this.callbacks.onStart();
}

Grader.prototype.setColors = require('./setColors.js');

module.exports = Grader;
