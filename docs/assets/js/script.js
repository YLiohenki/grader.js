(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var main = require('./main.js'),
	home = require('./pages/home.js'),
	examples = require('./pages/examples.js'),
	api = require('./pages/api.js');

$(document).on('DOMContentLoaded', function() {
	switch(pageId) {
		default:
		case 'homepage':
			home.init();
			break;

		case 'examples':
			main.init();
			examples.init();
			break;

		case 'api':
			main.init();
			api.init();
			break;
	}
});

},{"./main.js":2,"./pages/api.js":3,"./pages/examples.js":4,"./pages/home.js":5}],2:[function(require,module,exports){
'use strict';

module.exports = {
	init: function() {
		this.hamburgerIcon();
	},

	hamburgerIcon: function() {
		$('.hamburger-icon').click(function(){
			$(this).toggleClass('open');
			$('.main-nav').toggleClass('open');
		});
	}
};

},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}]},{},[1]);
