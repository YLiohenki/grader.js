'use strict';
module.exports = {
    init: function() {
        this.home.init();
    },

    home: {
        graderHeaderInstance: null,
        graderInstance: null,
        init: function() {
            this.background();
            this.header();
            this.text();
            this.events();
        },

        background: function() {
            this.graderInstance = new Grader({
                name: 'main-gradient',
                element: '#grader-elem',
                isPausedWhenNotInView: true,
                opacity: [1, 1],
                gradientType: 'linear',
                gradientOrigin: 'to bottom right',
                stateTransitionSpeed: 1000,
                animationStep: 50,
                callbacks: {
                    onLightnessChange: function(detail) {
                        if (detail.state == 'dark') {
                            this.graderHeaderInstance.changeState('light-state');
                            this.graderTextInstance.changeState('light-state');
                        } else {
                            this.graderHeaderInstance.changeState('default-state');
                            this.graderTextInstance.changeState('default-state');
                        }
                    }.bind(this)
                },
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
                    },
                    "green-state": {
                        gradients: [
                            ['#348F50', '#56B4D3'],
                            ['#215f00', '#e4e4d9'],
                            ['#134E5E', '#71B280']
                        ],
                        transitionSpeed: 1000,
                        loop: false
                    },
                    "red-state": {
                        gradients: [
                            ['#e43a15', '#e65245'],
                            ['#A83279', '#D38312']
                        ],
                        transitionSpeed: 1000,
                        loop: false
                    },
                    "dark-state": {
                        gradients: [
                            ['#000000', '#434343']
                        ],
                        loop: false
                    },
                }
            });
        },

        text: function() {
            this.graderTextInstance = new Grader({
                name: 'text-grader-gradient',
                element: '#GraderText',
                gradientType: 'linear',
                gradientOrigin: 'to top right',
                stateTransitionSpeed: 1000,
                animationStep: 50,
                applyToText: true,
                states: {
                    "default-state": {
                        gradients: [
                            ['#000000', '#545454']
                        ]
                    },
                    "light-state": {
                        gradients: [
                            ['#ffffff', '#898989'],
                            ['#ffffff', '#870000'],
                            ['#ffffff', '#ffffff']
                        ],
                        transitionSpeed: 5000,
                    },
                }
            });
        },
        header: function() {
            this.graderHeaderInstance = new Grader({
                name: 'header-grader-gradient',
                element: '#GraderHeader',
                gradientType: 'linear',
                gradientOrigin: '135deg',
                stateTransitionSpeed: 1000,
                animationStep: 50,
                applyToText: true,
                states: {
                    "default-state": {
                        gradients: [
                            ['#000000', '#545454']
                        ]
                    },
                    "light-state": {
                        gradients: [
                            ['#ffffff', '#232323']
                        ]
                    },
                }
            });
        },
        events: function() {
            $('#green-state').hover(function() {
                this.graderInstance.changeState('green-state');
            }.bind(this), function() {
                this.graderInstance.changeState('default-state');
            }.bind(this));
            $('#red-state').hover(function() {
                this.graderInstance.changeState('red-state');
            }.bind(this), function() {
                this.graderInstance.changeState('default-state');
            }.bind(this));
            $('#dark-state').hover(function() {
                this.graderInstance.changeState('dark-state');
            }.bind(this), function() {
                this.graderInstance.changeState('default-state');
            }.bind(this));
        }
    }
};
