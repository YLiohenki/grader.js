'use strict';

module.exports = function() {
	var _this = this;
	var colorDiff, nextColors;

  if (!this.channels[this.activeState]) {
		this.channels[this.activeState] = [];
	}

  if (this.channels[this.activeState][this.channelsIndex] !== undefined) {
    this.activeColors = this.channels[this.activeState][this.channelsIndex].colors;
    this.activeColorDiff = this.channels[this.activeState][this.channelsIndex].colorsDiff;
    return;
  }
};
