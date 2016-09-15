'use strict';

module.exports = function() {
    var timeout;

    var pauseWhenNotInView = function(init) {
        console.log('pauseWhenNotInView');
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(function() {
            var rect = this.element.getBoundingClientRect();
            var isNotInView =
                rect.bottom < 0 ||
                rect.right < 0 ||
                rect.left > window.innerWidth ||
                rect.top > window.innerHeight;

            if (isNotInView) {
                if (!this.isPaused && !this.isPausedBecauseNotInView) {
                    this.isPausedBecauseNotInView = true;
                    this.pause('isPausedBecauseNotInView');
                }
            } else {
                if (!this.isPaused || init === true) {
                    this.isPausedBecauseNotInView = false;
                    this.resume('isPausedBecauseNotInView');
                }
            }
        }.bind(this), 300);
    }.bind(this);

    window.addEventListener('scroll', pauseWhenNotInView);
    pauseWhenNotInView(true);
};
