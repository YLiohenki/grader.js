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
  var speed = this.speed || 2000;
  var step = this.animationStep || (speed < 500 ? 50 : (speed < 5000 ? 100 : 200));
  this.refreshIntervalId = setInterval(this.updateGradient.bind(this), step);
}
