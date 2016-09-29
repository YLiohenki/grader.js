'use strict';

module.exports = {
    init: function() {
        this.examples.init();
    },

    examples: {
        init: function() {
            this.header();
            this.basic();
            this.radial();
            this.frontImage();
            this.text();
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
        },

        basic: function() {
            var basicGraderInstance = new Grader({
                name: 'simple-gradient-grader',
                element: '#simplegradient',
                gradientType: 'linear',
                gradientOrigin: 'to top right',
                states: {
                    "default-state": {
                        gradients: [
                            ['#42275a' , '#734b6d'],
                            ['#3a6186', {color: '#89253e', opacity: 0.85}],
                            ['#FFA17F', '#00223E']
                        ],
                        loop: true
                    }
                }
            });
        },

        radial: function() {
            var radialGraderInstance = new Grader({
                name: 'radial-gradient-grader',
                element: '#radialgradient',
                gradientType: 'radial',
                gradientOrigin: 'circle closest-corner',
                animationStep: 50,
                states: {
                    "default-state": {
                        gradients: [
                            ['#42275a', '#734b6d'],
                            ['#3a6186', {color: '#89253e', opacity: 0.85}],
                            ['#FFA17F', '#00223E']
                        ],
                        loop: true
                    }
                }
            });
        },

        frontImage: function() {
            var frontImageGraderInstance = new Grader({
                name: 'front-image-gradient-grader',
                element: '#frontimagegradient',
                gradientType: 'radial',
                gradientOrigin: 'ellipse farthest-side',
                animationStep: 50,
                backgroundImage: 'url("assets/images/sun.png") no-repeat center',
                states: {
                    "default-state": {
                        gradients: [
                            ['#004e92', {color: '#004e92', size: 0.1}],
                            ['#9E0E00', '#1F1C18'],
                            ['#970000', '#190A05']
                        ],
                        transitionSpeed: 5000,
                        loop: true
                    }
                }
            });
        },

        text: function() {
            var frontImageGraderInstance = new Grader({
                name: 'front-image-gradient-grader',
                element: '#textgradient',
                gradientType: 'linear',
                gradientOrigin: 'to right',
                applyToText: true,
                states: {
                    "default-state": {
                        gradients: [
                          ['#7474BF', '#348AC7'],
                          [{color: '#2196f3',size: -0.2}, '#f44336'],
                          ['#2c3e50', {color: '#3498db',opacity: 0.5}],
                          ['#5C258D', '#4389A2'],
                          ['#000317', '#002c70']
                        ],
                        transitionSpeed: 5000,
                        loop: true
                    }
                }
            });
        }
    }
};
