"use strict"

var l = function (a) {
	if (console && console.log) {
		console.log(a)
	};
};

// Temp
var Score = 10
Crafty.bind('SceneChange', function (data) {
	l("HEYHO" + data.newScene)
	if (data.newScene != 'game') {
		return
	};
	l("HEYHO")
	var progressBar = Crafty.e("2D, DOM, ProgressBar")
    .attr({ x: 200, y : Crafty.DOM.window.height - 35, w: 300, h: 25})
    .progressBar(100, false, "blue", "green")
    .updateBarProgress(Score);
    setInterval(function () {
    	l("BLORG")
    	Score += 10
    	progressBar.updateBarProgress(Score);
    }, 1000)
});