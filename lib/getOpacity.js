'use strict';

module.exports = function(color, isFirstColor) {
    var prev = color.opacity;
    if (prev || prev == 0)
        return prev;
    prev = (typeof this.workingState.opacity === 'object' ? this.workingState.opacity[isFirstColor ? 0 : 1] : null);
    if (prev || prev == 0)
        return prev;
    prev = this.workingState.opacity;
    if (prev || prev == 0)
        return prev;
    prev = (typeof this.opacity === 'object' ? this.opacity[isFirstColor ? 0 : 1] : null);
    if (prev || prev == 0)
        return prev;
    prev = this.opacity;
    if (prev || prev == 0)
        return prev;
    prev = 1;
    return prev;
}
