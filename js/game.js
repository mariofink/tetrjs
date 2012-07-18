(function(tetrjs) {
	var stage = null;
	var gameLayer = null;
	var currentPiece = null;
	function init() {
		setupStage();
		var piece = tetrjs.piece.create();
		gameLayer.add(piece);
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
			//gameLayer.setY(gameLayer.getY() + 2);
			//gameLayer.draw();
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
	function getGameLayer() {
		return gameLayer;
	}
	
	tetrjs.game = {
		init: init,
		getGameLayer: getGameLayer
	}

})(window.tetrjs = window.tetrjs || {});