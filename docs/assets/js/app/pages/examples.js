'use strict';

module.exports = {
    init: function() {
        this.examples.init();
    },

    examples: {
        frontImageGraderInstance: null,
        init: function() {
            this.header();
            this.basic();
            this.radial();
            this.frontImage();
            this.text();
            this.interactive();
            this.events();
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
                            ['#003e72', {color: '#003e72', size: 0.1}],
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
        },

        interactive: function() {
            this.frontImageGraderInstance = new Grader({
                name: 'interactive-gradient-grader',
                element: '#interactive',
                gradientType: 'linear',
                gradientOrigin: 'to bottom right',
                stateTransitionSpeed: 1000,
                animationStep: 50,
                states: {
                    "default-state": {
                        gradients: [['#7474BF', '#348AC7']]
                    },
                    "green-state": {
                        gradients: [['#6A9113', '#141517']]
                    },
                    "violet-state": {
                        gradients: [
                            ['#6441A5', '#2a0845'],
                            ['#360033', '#0b8793'],
                            ['#000000', '#53346D']
                        ],
                        transitionSpeed: 3000,
                        loop: true
                    },
                    "orange-state": {
                        gradients: [['#fe8c00', '#f83600']]
                    }
                }
            });
        },
        events: function() {
            $('#green-state-cta').hover(function() {
                this.frontImageGraderInstance.changeState('green-state');
            }.bind(this), function() {
                this.frontImageGraderInstance.changeState('default-state');
            }.bind(this));
            $('#violet-state-cta').hover(function() {
                this.frontImageGraderInstance.changeState('violet-state');
            }.bind(this), function() {
                this.frontImageGraderInstance.changeState('default-state');
            }.bind(this));
            $('#orange-state-cta').hover(function() {
                this.frontImageGraderInstance.changeState('orange-state');
            }.bind(this), function() {
                this.frontImageGraderInstance.changeState('default-state');
            }.bind(this));
        }
    }
};
