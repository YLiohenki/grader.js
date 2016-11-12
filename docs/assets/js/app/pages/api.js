'use strict';

module.exports = {
    init: function() {
        this.api.init();
    },

    api: {
        init: function() {
            this.header();
        },
        header: function() {
            var graderHeaderInstance = new Grader({
                name: 'logo-grader',
                element: '#logo-grader',
                gradientType: 'linear',
                gradientOrigin: '135deg',
                stateTransitionSpeed: 1000,
                animationStep: 50,
                applyToText: true,
                states: {
                    "default-state": {
                        gradients: [
                            [{
                                color: '#42275a'
                            }, {
                                color: '#734b6d'
                            }],
                            [{
                                color: '#3a6186'
                            }, {
                                color: '#89253e'
                            }],
                            [{
                                color: '#FFA17F'
                            }, {
                                color: '#00223E'
                            }],
                            [{
                                color: '#e96443'
                            }, {
                                color: '#904e95'
                            }],
                            [{
                                color: '#c21500'
                            }, {
                                color: '#ffc500'
                            }]
                        ],
                        transitionSpeed: 5000,
                        loop: true
                    }
                }
            });
        }
    }
}