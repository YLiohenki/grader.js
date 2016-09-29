'use strict';

module.exports = function()
{
  if (!this.paused)
      return;
  this.paused = false;
  if (this.stopedAtTimeStamp)
  {
    this.previousStepTimeStamp = Date.now() - (this.stopedAtTimeStamp - this.previousStepTimeStamp);
    this.stopedAtTimeStamp = null;
  }
  var speed = this.speed || 5000;
  var step = this.animationStep || (speed < 500 ? 20 : (speed < 5000 ? 50 : 100));
  this.refreshIntervalId = setInterval(this.updateGradient.bind(this), step);
}
