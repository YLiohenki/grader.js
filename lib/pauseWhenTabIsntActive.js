'use strict';

module.exports = function() {

    var timeoutFocus;

    window.addEventListener("focus", function(event) {
        console.log('focus');
        if (timeoutFocus)
            clearTimeout(timeoutFocus);
        timeoutFocus = setTimeout(function() {
            this.resume();
        }.bind(this), 300);
    }, false);
    window.addEventListener("blur", function(event) {
        console.log('blur');
        this.pause();
    }.bind(this), false);
};
