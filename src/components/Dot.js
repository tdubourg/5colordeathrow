'use strict';

Crafty.c('Dot', {
	init: function() {
		var self = this;

		this.requires('Enemy,Collision');
		this.collision(new Crafty.polygon([4,4],[30,4],[30,30],[4,30]));
		this.attr({
			w: 34,
			h: 34
		});
		this.appearsProgressively = true;

		// hack to make sure all dots appear
		setTimeout(function() {
			self.attr({
				w: 34,
				h: 34
			});
		}, 10);
	},
	dot: function() {
		return this;
	}
});