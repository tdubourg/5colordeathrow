'use strict';

Crafty.c('Level', {
	init: function() {
		this.lastEvent = -1;
	},
	level: function( levelData ) {
		var level = this,
			levelDuration = levelData.duration,
			levelName = levelData.name;
		this.totalFrames = levelData.duration * 60 * 1000;
		this.data = levelData;

		this.bind('LevelIgnite', function() {
			Crafty('Score').maxScore = levelData.score
			this.unbind('EnterFrame');
			var self = this;
			Crafty.audio.play('chrono',1,0.5);
			Crafty.audio.play('three',1);
			Crafty.e('2D, DOM, Color, Text, TweenQueue')
				.attr({alpha: 1, x: Crafty.stage.elem.scrollWidth /2 - 32, y: Crafty.stage.elem.scrollHeight /2 - 30, w: 200, h: 100})
				.text('3')
				.textColor('#ffffff')
				.textFont({ size: '100px', weight: 'bold'})
				.queue([{
					alpha: 0,
					duration: 30,
					callback: function() {
						this.text('2')
							.attr({alpha: 1});
						Crafty.audio.play('chrono',1,0.5);
						Crafty.audio.play('two',1);
					}
				}, {
					alpha: 0,
					duration: 30,
					callback: function() {
						this.text('1')
							.attr({alpha: 1});
						Crafty.audio.play('chrono',1,0.5);
						Crafty.audio.play('one',1);
					}
				}, {
					alpha: 0,
					duration: 30,
					callback: function() {
						this.text('GO!')
							.attr({alpha: 1, x: this._x - 80});
						Crafty('Player').canMove = true;
						Crafty.audio.play('go',1);
					}
				}, {
					alpha: 0,
					duration: 30,
					callback: function() {
						this.destroy();
						self.trigger('LevelFire');
					}
				}]);
		});

		this.bind('LevelFire', function() {
			this.firstFrame = Crafty.frame();

			this.unbind('EnterFrame')
				.bind('EnterFrame', function( frame ) {
				var data = this.data,
					ellapsedSeconds = ( frame.frame - this.firstFrame ) * 16.66667 / 1000,
					currentEvent;

				Crafty.trigger('TimeLeft', {'timeleft': data.duration - ellapsedSeconds} );

				if ( ellapsedSeconds > data.duration ) {
					return this.trigger('LevelLand');
				}

				// Shall we play a new event?
				for ( var i in data.events ) {
					if ( +i > ellapsedSeconds ) {
						return;
					}
					if ( +i > this.lastEvent && ellapsedSeconds > +i ) {
						// an event has been found!
						currentEvent = data.events[i];
						this.lastEvent = +i;
						break;
					}
				}

				if ( currentEvent !== undefined ) {
					currentEvent.forEach(function( enemyData ) {
						var componentName = enemyData.type.replace(/^./, function( $0 ) { return $0.toUpperCase(); });

						var e = Crafty.e( componentName || '' )
						e.enemy( enemyData );
					});
				}
			});
		});

		this.bind('LevelLand', function() {
			this.unbind('EnterFrame');
			Crafty.audio.play('finish')
			// guys, stop moving please
			Crafty('Enemy').each(function() {
				this.removeComponent('Enemy')
					.removeComponent('Collision')
					.removeComponent('Translation')
					.removeComponent('Follower')
					.removeComponent('RandomTranslation')
					.unbind('EnterFrame');
			});
			// guys, leave me alone please
			Crafty('Player').each(function() {
				this.removeComponent('Collision')
					.removeComponent('PlayerCollision')
					.unbind('EnterFrame');
			});

			if ( parseInt(Crafty('Score').text()) > window.highscores[this.data.id] ) {
				window.highscores[this.data.id] = parseInt(Crafty('Score').text());
				localStorage.setItem("highscores", JSON.stringify(window.highscores));
			}

			Crafty.e('2D, DOM, Color, Mouse, TweenQueue')
				.attr({
					alpha: 0.8,
					x: Crafty.stage.elem.scrollWidth /2,
					y: Crafty.stage.elem.scrollHeight /2 - 30,
					w:1,
					h:1
				})
				.color('#FEFEFE')
				.queue([{
					x: Crafty.stage.elem.scrollWidth /4,
					y: Crafty.stage.elem.scrollHeight /4 - 30,
					w: Crafty.stage.elem.scrollWidth /2,
					h: Crafty.stage.elem.scrollHeight /2,
					duration: 30
				}], function() {
					var debrief = this;

					Crafty.e('2D, DOM, Text, TweenQueue')
						.attr({
							x: -100,
							y: Crafty.stage.elem.scrollHeight /2 - 110 - 30,
							w: 300,
							h: 40
						})
						.text( levelName + ' | ' + Math.floor( levelDuration / 60 ) + ':' + levelDuration % 60 )
						.textColor('#44aa00')
						.textFont({ size: '40px', weight: 'bold'})
						.queue([{
							x: Crafty.stage.elem.scrollWidth /2 - 90,
							rotation: -360,
							duration: 30
						}]);

					Crafty.e('2D, DOM, Text, TweenQueue')
						.attr({
							x: Crafty.stage.elem.scrollWidth,
							y: Crafty.stage.elem.scrollHeight /2 - 50 - 30,
							w: 400,
							h: 40
						})
						.text( Crafty('Score')._text )
						.textColor('#ff6600')
						.textFont({ size: '40px', weight: 'bold'})
						.queue([{
							x: Crafty.stage.elem.scrollWidth /2 - ( ( this._text + '' ).length * 12 ),
							rotation: -360,
							duration: 30
						}]);

					setTimeout(function() {
						var wise =  +Crafty('Score')._text.replace('/'+levelData.score, '') > levelData.score;

						Crafty.e('2D, DOM, Text, TweenQueue')
							.attr({
								x: Crafty.stage.elem.scrollWidth /2 - 135,
								y: Crafty.stage.elem.scrollHeight,
								w: 300,
								h: 60
							})
							.text( wise ? 'YOU WIN!' : 'YOU LOSE!' )
							.textColor('#800080')
							.textFont({ size: '50px', weight: 'bold'})
							.queue([{
								y: Crafty.stage.elem.scrollHeight /2 + 30 - 30,
								rotation: 720,
								duration: 30
							}], function() {
								Crafty.audio.play( wise ? 'voicewin' : 'voicelose', 1);
							});

						if(!wise) {
							Crafty.e('2D, DOM,Image')
							.image('assets/menus/youlose.png')
							.attr({x:Crafty.stage.elem.scrollWidth-300,y:Crafty.stage.elem.scrollHeight-300})
						}


						debrief.bind('Click', function() {
							level.trigger('LevelEnd');
						});
					}, 500);
				});
		});

		this.trigger('LevelIgnite');

		return this;
	}
});