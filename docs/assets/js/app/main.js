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
