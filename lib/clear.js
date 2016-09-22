'use strict';

module.exports = function() {
    if (this.refreshIntervalId)
        clearInterval(this.refreshIntervalId);
    if (this.changeStateIntervalId)
        clearInterval(this.changeStateIntervalId);
    if (this.changeStateTimeout)
        clearTimeout(this.changeStateTimeout);
    this.element.setAttribute("style",
        "background:;");
};
