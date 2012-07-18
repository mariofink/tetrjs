(function(tetrjs) {
	var stage = null;
	var gameLayer = null;
	var currentPiece = null;
	var paused = false;
	function init() {
		setupStage();
		currentPiece = tetrjs.piece.create();
		gameLayer.add(currentPiece.group);
		gameLayer.draw();
		return true;
	}
	function setupStage() {
		stage = new Kinetic.Stage({
			container: "container",
			width: 320,
			height: 576
		});
		gameLayer = new Kinetic.Layer();
		stage.add(createBoard());
		stage.add(gameLayer);
		stage.onFrame(function(frame) {
			if (paused === true) return;
			if (currentPiece !== null) {
				currentPiece.move();
			}
			gameLayer.draw();
		});
		stage.start();
	}
	function createBoard() {
		var layer = new Kinetic.Layer();
		var rect = new Kinetic.Rect({
			x: 0,
			y: 0,
			width: 320,
			height: 576,
			fill: "#ffffff",
			stroke: "black",
			strokeWidth: 1
		});
		layer.add(rect);
		return layer;
	}
	
	tetrjs.game = {
		init: init,
		pauseGame: function() {
			paused = true;
		},
		resumeGame: function() {
			paused = false;
		}
	}

})(window.tetrjs = window.tetrjs || {});