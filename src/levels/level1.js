'use strict';

window.levels.level1 = {
	id: 3, 
	name:'lvl 3',
	duration: 30,
	score: 60000, 
	events: {
		0: [{
			type: 'shape',
			color: 'one',
			coords: [0,10],
			width: 1250,
			height: 10,
			scoreType:'ComboEnemy',
			behavior: {
				type:'Translation',
				orient:'vert'
			}
		}],
		5: [{
			type: 'dot',
			color: 'three',
			lifespan: 9,
			coords: [1000,400],
			scoreType:'DotEnemy',
			behavior: {}
		},{
			type: 'shape',
			color: 'two',
			coords: [0,0],
			width: 10,
			height: 600,
			scoreType:'ComboEnemy',
			behavior: {
				type:'Translation',
				orient:'horiz'
			}
		},{
			type: 'shape',
			color: 'two',
			coords: [500,0],
			width: 10,
			height: 600,
			scoreType:'ComboEnemy',
			behavior: {
				type:'Translation',
				orient:'horiz'
			}
		}, {
			type: 'dot',
			color: 'two',
			lifespan: 9,
			coords: [200,100],
			scoreType:'DotEnemy',
			behavior: {}
		},{
			type: 'dot',
			color: 'one',
			lifespan: 9,
			coords: [1000,100],
			scoreType:'DotEnemy',
			behavior: {}
		},{
			type: 'shape',
			color: 'two',
			coords: [1000,0],
			width: 10,
			height: 600,
			scoreType:'ComboEnemy',
			behavior: {
				type:'Translation',
				orient:'horiz'
			}
		}, {
			type: 'dot',
			color: 'three',
			lifespan: 9,
			coords: [200,400],
			scoreType:'DotEnemy',
			behavior: {}
		}],
		15: [{
			type: 'dot',
			color: 'three',
			lifespan: 20,
			coords: [800,100],
			scoreType:'DotEnemy',
			behavior: {}
		},{
			type: 'dot',
			color: 'one',
			lifespan: 20,
			coords: [900,400],
			scoreType:'DotEnemy',
			behavior: {}
		},{
			type: 'dot',
			color: 'two',
			lifespan: 20,
			coords: [100,400],
			scoreType:'DotEnemy',
			behavior: {}
		},{
			type: 'shape',
			color: 'three',
			coords: [0,100],
			width: 1250,
			height: 10,
			scoreType:'ComboEnemy',
			behavior: {
				type:'Translation',
				orient:'vert'}
		},{
			type: 'dot',
			color: 'one',
			lifespan: 20,
			coords: [1000,200],
			scoreType:'DotEnemy',
			behavior: {}
		},{
			type: 'dot',
			color: 'two',
			lifespan: 20,
			coords: [400,200],
			scoreType:'DotEnemy',
			behavior: {}
		},{
			type: 'dot',
			color: 'one',
			lifespan: 20,
			coords: [300,100],
			scoreType:'DotEnemy',
			behavior: {}
		},{
			type: 'dot',
			color: 'three',
			lifespan: 20,
			coords: [300,300],
			scoreType:'DotEnemy',
			behavior: {}
		},{
			type: 'dot',
			color: 'two',
			lifespan: 20,
			coords: [1000,500],
			scoreType:'DotEnemy',
			behavior: {}
		},{
			type: 'shape',
			color: 'one',
			coords: [525,0],
			width: 200,
			height: 400,
			scoreType:'ComboEnemy',
			behavior: {}
		}]
	}
};