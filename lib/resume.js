'use strict';

module.exports = function()
{
  this.paused = false;
  if (this.stopedAtTimeStamp)
  {
    this.previousStepTimeStamp = Date.now() - (this.stopedAtTimeStamp - this.previousStepTimeStamp);
    this.stopedAtTimeStamp = null;
  }
  var that = this;
  this.refreshIntervalId = setInterval(this.updateGradient.bind(that), this.animationStep || 200);
}
