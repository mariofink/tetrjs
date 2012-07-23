(function(tetrjs) {
	var Tetromino = function(position) {
		_self = this;
		this.position = position || {x: 0, y: 0};
		var rect = new Kinetic.Rect({
			width: tetrjs.config.board.blockSize,
			height: tetrjs.config.board.blockSize,
			fill: '#bada55',
			strokeWidth: 0,
			detectionType: "path"
		});
		rect.setOffset(12,12);
		this.group = new Kinetic.Group();
		//this.group.setOffset(-12,-12);
		this.group.setPosition(this.position.x * tetrjs.config.board.blockSize, this.position.y * tetrjs.config.board.blockSize);
		
		this.group.add(rect);
		this.group.add(rect.clone({
			x: tetrjs.config.board.blockSize, 
			y:0,
			fill: getRandomColor()
		}));
		this.group.add(rect.clone({
			x: tetrjs.config.board.blockSize, 
			y:tetrjs.config.board.blockSize,
			fill: getRandomColor()
		}));
		this.group.add(rect.clone({
			x: tetrjs.config.board.blockSize*2, 
			y:tetrjs.config.board.blockSize,
			fill: getRandomColor()
		}));
		//this.group.setOffset([48,24]);
		
		this.move = function(direction) {
			var newPosition = null;
			switch (direction) {
				case "left":
					if (this.doesIntersect(-1, 0) !== false) {
						newPosition = {x: this.position.x - 1, y: this.position.y};
					} else {
						return false;
					}
				break;
				case "right":
					if (this.doesIntersect(1, 0) !== false) {
						newPosition = {x: this.position.x + 1, y: this.position.y};
					} else {
						return false;
					}
				break;
				case "down":
					if (this.doesIntersect(0, 1) !== false) {
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
		this.doesIntersect = function (_x, _y) {
			var blocks = this.group.getChildren();
			// check for each block if it can be moved in the desired direction
			for (var i = 0, len = blocks.length; i < len; i++) {
				var pos = blocks[i].getAbsolutePosition();
				var copy = blocks[i].clone();
				copy.setAbsolutePosition(pos);
				if (_y == 1) {
					copy.setY(copy.getY() + tetrjs.config.board.blockSize);
				}
				if (_x == 1) {
					copy.setX(copy.getX() + tetrjs.config.board.blockSize);
				}
				if (_x == -1) {
					copy.setX(copy.getX() - tetrjs.config.board.blockSize+1);
				}
				var int = tetrjs.game.getBlockHeap().getIntersections(copy.getAbsolutePosition());
				console.log(i, "pos:", copy.getAbsolutePosition());
				if (int.length > 0) return false;
			}
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
				position.x = parseInt(position.x / tetrjs.config.board.blockSize);
				position.y = parseInt(position.y / tetrjs.config.board.blockSize);
				var newPosition = {
					x: position.x + _x,
					y: position.y + _y
				};
				//console.log(newPosition);
				if (newPosition.x < 0) return false;
				if (newPosition.x >= tetrjs.config.board.width) return false;
				if (newPosition.y < 0) return false;
				if (newPosition.y >= tetrjs.config.board.height) return false;
				if (tetrjs.board.isOccupied(newPosition)) return false;
			}
			return true;
		}
		this.rotate = function () {
			console.warn(this.group.getAbsoluteTransform());
			var blocks = this.group.getChildren();
			for (var i = 0, len = blocks.length; i < len; i++) {
				var block = blocks[i];
				var position = block.getAbsolutePosition();
				console.log(i, "before", position);
			}
			this.group.rotateDeg(90);
			for (var i = 0, len = blocks.length; i < len; i++) {
				var block = blocks[i];
				var position = block.getAbsolutePosition();
				console.log(i, "after", position);
			}
		}
		this.draw = function() {
			this.group.setPosition(this.position.x * tetrjs.config.board.blockSize, this.position.y * tetrjs.config.board.blockSize);
			console.info("drew group at: ", this.group.getAbsolutePosition());
		}
	};
	function create(position) {
		return new Tetromino(position);
	}
	function getRandomColor() {
		return '#'+Math.floor(Math.random()*16777215).toString(16);
	}
	tetrjs.tetromino = {
		create: create
	};
})(window.tetrjs = window.tetrjs || {});