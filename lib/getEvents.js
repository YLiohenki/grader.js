'use strict';

module.exports = function() {
    return {
        start: new CustomEvent('grader:' + this.name + ':start'),
        end: new CustomEvent('grader:' + this.name + ':end'),
        pause: new CustomEvent('grader:' + this.name + ':pause'),
        resume: new CustomEvent('grader:' + this.name + ':resume'),
        lightnessChange: function(details) {
            return new CustomEvent('grader:' + this.name + ':lightnessChange', {
                detail: {
                    state: details.state,
                },
                bubbles: false,
                cancelable: false
            })
        }.bind(this),
        gradientChange: function(details) {
            return new CustomEvent('grader:' + this.name + ':gradientChange', {
                detail: {
                    isLooping: details.isLooping,
                    colorsFrom: details.colorsFrom,
                    colorsTo: details.colorsTo,
                    activeState: details.activeState
                },
                bubbles: false,
                cancelable: false
            })
        }.bind(this)
    }
};
