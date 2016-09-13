'use strict';

module.exports = function()
{
  this.paused = true;
  this.stopedAtTimeStamp = Date.now();
  clearInterval(this.refreshIntervalId);
}
