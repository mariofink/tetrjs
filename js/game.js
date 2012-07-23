(function(tetrjs) {
	var stage = null;
	var gameLayer = null;
	var blockHeap = null;
	var currentShape = null;	
	var paused = false;
	
	var KEY = { ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
	
	function init() {
		setupStage();
		document.addEventListener('keydown', keydown, false);
		return true;
	}
	function setupStage() {
		stage = new Kinetic.Stage({
			container: "container",
			width: tetrjs.config.board.width * tetrjs.config.board.blockSize,
			height: tetrjs.config.board.height * tetrjs.config.board.blockSize
		});
		gameLayer = new Kinetic.Layer();
		blockHeap = new Kinetic.Group();
		createBorders();
		gameLayer.add(blockHeap);
		stage.add(gameLayer);
		stage.onFrame(gameLoop);
		stage.start();
	}
	function createBorders() {
		blockHeap.add(new Kinetic.Rect({
			x: -tetrjs.config.board.blockSize,
			y: 0,
			width: tetrjs.config.board.blockSize,
			height: stage.getHeight(),
			fill: "#00D2FF",
			offset: [0,0]
		}));
		blockHeap.add(new Kinetic.Rect({
			x: stage.getWidth(),
			y: 0,
			width: tetrjs.config.board.blockSize,
			height: stage.getHeight(),
			fill: "#00D2FF",
			offset: [0,0]
		}));
		blockHeap.add(new Kinetic.Rect({
			x: 0,
			y: stage.getHeight(),
			width: stage.getWidth(),
			height: tetrjs.config.board.blockSize,
			fill: "#00D2FF",
			offset: [0,-12]
		}));
	}
	function gameLoop(frame) {
		if (paused === true) return;
		if (currentShape === null) {
			//currentShape = new tetrjs.Tetromino({x: tetrjs.config.board.width / 2, y: 0});
			currentShape = new tetrjs.shapes.Shape_J({x: tetrjs.config.board.width / 2, y: 0});
			gameLayer.add(currentShape.shape);
			currentShape.draw();
		}
		gameLayer.draw();
	}
	
	function keydown(e) {
		if (currentShape !== null) {
			if (e.keyCode == KEY.UP) {
				currentShape.rotate();
				e.preventDefault();
			}
			if (e.keyCode == KEY.DOWN) {
				currentShape.move("down");	
				e.preventDefault();
			}
			if (e.keyCode == KEY.LEFT) {
				currentShape.move("left");
				e.preventDefault();
			}
			if (e.keyCode == KEY.RIGHT) {
				currentShape.move("right");
				e.preventDefault();
			}
		}
	}
	/**
		Called when the piece can't be moved anymore
		Adds the shape to the block heap and adjusts the matrix
	**/
	function blockify(piece) {
		var blocks = piece.group.getChildren();
		for (var i = 0, len = blocks.length; i<len; i++) {
			var block = blocks[i];
			var position = block.getAbsolutePosition();
			// calculate position in the matrix
			position.x = parseInt(position.x / tetrjs.config.board.blockSize);
			position.y = parseInt(position.y / tetrjs.config.board.blockSize);
		}
		piece.group.moveTo(blockHeap);
		currentShape = null;
	}
	
	tetrjs.game = {
		init: init,
		blockify: blockify,
		getGameLayer: function() {
			return gameLayer;
		},
		getBlockHeap: function() {
			return blockHeap;
		},
		pauseGame: function() {
			paused = true;
		},
		resumeGame: function() {
			paused = false;
		}
	}

})(window.tetrjs = window.tetrjs || {});