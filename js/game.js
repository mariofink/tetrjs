(function(tetrjs) {
	var stage = null;
	var gameLayer = null;
	var blockHeap = null;
	var currentPiece = null;
	var paused = false;
	
	var KEY = { ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
	
	function init() {
		setupStage();
		currentPiece = tetrjs.piece.create();
		gameLayer.add(currentPiece.group);
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
		gameLayer.add(blockHeap);
		stage.add(createBoard());
		stage.add(gameLayer);
		stage.onFrame(function(frame) {
			if (paused === true) return;
			if (currentPiece !== null) {
				//currentPiece.move();
			}
			gameLayer.draw();
		});
		stage.start();
	}
	function keydown(e) {
		if (currentPiece !== null) {
			if (e.keyCode == KEY.DOWN) {
				currentPiece.down();	
				e.preventDefault();
			}
			if (e.keyCode == KEY.LEFT) {
				currentPiece.left();	
				e.preventDefault();
			}
			if (e.keyCode == KEY.RIGHT) {
				currentPiece.right();	
				e.preventDefault();
			}
		}
	}
	function createBoard() {
		var layer = new Kinetic.Layer();
		var rect = new Kinetic.Rect({
			x: 0,
			y: 0,
			width: tetrjs.config.board.width * tetrjs.config.board.blockSize,
			height: tetrjs.config.board.height * tetrjs.config.board.blockSize,
			fill: "#ffffff",
			stroke: "black",
			strokeWidth: 1
		});
		layer.add(rect);
		return layer;
	}
	
	/**
		Called when the piece can't be moved anymore
		Turns shape into single blocks and adds them to the block heap
	**/
	function blockify(piece) {
		var blocks = piece.group.getChildren();
		for (var i = 0, len = blocks.length; i < len; i++) {
			var block = blocks[i];
			block.moveTo(blockHeap);
		}
		currentPiece = null;
	}
	
	tetrjs.game = {
		init: init,
		blockify: blockify,
		pauseGame: function() {
			paused = true;
		},
		resumeGame: function() {
			paused = false;
		}
	}

})(window.tetrjs = window.tetrjs || {});