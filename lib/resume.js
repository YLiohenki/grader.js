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
  this.refreshIntervalId = setInterval(this.updateGradient.bind(this), this.animationStep || 200);

  if (this.events)
  {
    document.dispatchEvent(this.events.resume);
  }
}
