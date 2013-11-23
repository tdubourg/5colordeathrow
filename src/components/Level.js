'use strict';

(function() {
	Crafty.c('Level', {
		init: function() {
			this.firstFrame = Crafty.frame();
			this.lastEvent = -1;
		},
		level: function( levelData ) {
			this.totalFrames = levelData.length * 60 * 1000;

			this.bind('EnterFrame', function( frame ) {
				var ellapsedSeconds = ( frame.frame - this.firstFrame ) * 16.66667 / 1000,
					currentEvent;

				// Shall we play a new event?
				for ( var i in levelData.events ) {//console.log(i);
					if ( +i > ellapsedSeconds ) {
						return;
					}
					if ( +i > this.lastEvent && ellapsedSeconds > +i ) {
						// an event has been found!
						currentEvent = levelData.events[i];
						this.lastEvent = +i;
						break;
					}
				}

				if ( currentEvent !== undefined ) {
					currentEvent.forEach(function( enemyData ) {
						console.log('pop', ellapsedSeconds);
						Crafty.e(enemyData.type.replace(/^./, function( $0 ) { return $0.toUpperCase(); }))
							.enemy( enemyData );
					});
				}
			});
		}
	});

})();