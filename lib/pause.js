'use strict';

module.exports = function() {
    if (this.paused)
        return;
    this.paused = true;
    this.stopedAtTimeStamp = Date.now();
    clearInterval(this.refreshIntervalId);
    this.refreshIntervalId = null;

    if (this.events)
  	{
  		document.dispatchEvent(this.events.pause);
  	}
}
