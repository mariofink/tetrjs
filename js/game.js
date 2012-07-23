(function(tetrjs) {
	var stage = null;
	var gameLayer = null;
	var blockHeap = null;
	var currentShape = null;	
	var paused = false;
	var SHAPES = ["T","L","O","I","S","Z","J"];
	
	var KEY = { ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
	
	function init() {
		setupStage();
		window.setInterval(moveDown, 100);
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
			// create a new random tetromino
			var shape = tetrjs.util.getRandomInt(0,6);
			currentShape = new tetrjs.Tetromino(SHAPES[shape], {x: tetrjs.config.board.width / 2, y: 0});
			gameLayer.add(currentShape.shape);
			currentShape.draw();
		}
		gameLayer.draw();
	}
	function moveDown() {
		if (currentShape !== null) {
			currentShape.move("down");
		}
	}
	function keydown(e) {
		if (paused === true) return;
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
		piece.shape.moveTo(blockHeap);
		/*for (var i = 0, len = tetrjs.config.board.height; i<len; i++) {
			for (var j = 0, len = tetrjs.config.board.weight; j<len; j++) {
							
			}
		}*/
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