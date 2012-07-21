(function(tetrjs) {
	var Tetromino = function(position) {
		_self = this;
		this.position = position || {x: 0, y: 0};
		var rect = new Kinetic.Rect({
			x: 0, y: 0,
			width: tetrjs.config.board.blockSize,
			height: tetrjs.config.board.blockSize,
			fill: '#bada55',
			stroke: "#000",
			strokeWidth: 1
		});
		this.group = new Kinetic.Group();
		this.group.setPosition(this.position.x * tetrjs.config.board.blockSize, this.position.y * tetrjs.config.board.blockSize);
		this.group.add(rect);
		this.group.add(rect.clone({x: tetrjs.config.board.blockSize, y:0}));
		this.group.add(rect.clone({x: tetrjs.config.board.blockSize, y:tetrjs.config.board.blockSize}));
		this.group.add(rect.clone({x: tetrjs.config.board.blockSize*2, y:tetrjs.config.board.blockSize}));
		this.move = function(direction) {
			var newPosition = null;
			switch (direction) {
				case "left":
					if (this.isMovable(-1, 0)) {
						newPosition = {x: this.position.x - 1, y: this.position.y};
					} else {
						return false;
					}
				break;
				case "right":
					if (this.isMovable(1, 0)) {
						newPosition = {x: this.position.x + 1, y: this.position.y};
					} else {
						return false;
					}
				break;
				case "down":
					if (this.isMovable(0, 1)) {
						newPosition = {x: this.position.x, y: this.position.y + 1};
					} else {
						console.log("blockify", this);
						tetrjs.game.blockify(this);
						return false;
					}
				break;
			}
			if (newPosition === null) {
				console.error("direction not supported");
				return false;
			};
			this.position = newPosition;
			this.draw();
		}
		/**
			check if the tetromino can be moved in a specified direction
		**/
		this.isMovable = function (_x,_y) {
			var blocks = this.group.getChildren();
			// check for each block if it can be moved in the desired direction
			for (var i = 0, len = blocks.length; i < len; i++) {
				var block = blocks[i];
				var position = block.getAbsolutePosition();
				// calculate position in the matrix
				position.x = position.x / tetrjs.config.board.blockSize;
				position.y = position.y / tetrjs.config.board.blockSize;
				var newPosition = {
					x: position.x + _x,
					y: position.y + _y
				};
				console.log(newPosition);
				if (newPosition.x < 0) return false;
				if (newPosition.x >= tetrjs.config.board.width) return false;
				if (newPosition.y < 0) return false;
				if (newPosition.y >= tetrjs.config.board.height) return false;
				if (tetrjs.board.isOccupied(newPosition)) return false;
			}
			return true;
		}
		this.draw = function() {
			this.group.setPosition(this.position.x * tetrjs.config.board.blockSize, this.position.y * tetrjs.config.board.blockSize);
		}
	};
	function create(position) {
		return new Tetromino(position);
	}
	
	tetrjs.tetromino = {
		create: create
	};
})(window.tetrjs = window.tetrjs || {});