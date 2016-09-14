'use strict';

module.exports = function()
{
  this.paused = false;
  if (this.stopedAtTimeStamp)
  {
    this.previousStepTimeStamp = Date.now() - (this.stopedAtTimeStamp - this.previousStepTimeStamp);
    this.stopedAtTimeStamp = null;
  }
  this.refreshIntervalId = setInterval(this.updateGradient.bind(this), this.animationStep || 200);
}
