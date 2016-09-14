'use strict';

module.exports = function() {
    if (this.refreshIntervalId)
        clearInterval(this.refreshIntervalId);
    this.element.setAttribute("style",
        "background:;" );
};
