(function(tetrjs) {
	var protoPiece = function(shape) {
		_self = this;
		this.position = {x: tetrjs.config.board.width/2, y: 0}; // start in the top middle
		this.group = new Kinetic.Group({
			x: this.position.x * tetrjs.config.board.blockSize, y: 0
		});
		this.group.add(shape);
		
		this.move = function(direction) {
			var newPosition = null;
			switch (direction) {
				case "left":
					newPosition = {x: this.position.x - 1, y: this.position.y};
					if ( (newPosition.x < 0) || (tetrjs.board.isOccupied(newPosition)) ) {
						return false;
					}
				break;
				case "right":
					newPosition = {x: this.position.x + 1, y: this.position.y};
					if ( (newPosition.x == tetrjs.config.board.width) || (tetrjs.board.isOccupied(newPosition)) ) {
						return false;
					}
				break;
				case "down":
					newPosition = {x: this.position.x, y: this.position.y + 1};
					// stop if piece is in one of the bottom tiles
					if ( (newPosition.y == tetrjs.config.board.height) || (tetrjs.board.isOccupied(newPosition)) ) {
						tetrjs.game.blockify(this);
						return false;
					}
				break;
			}
			if (newPosition === null) {
				console.error("direction not supported");
				return false;
			};
			tetrjs.board.release(this.position);
			this.position = newPosition;
			this.group.setPosition(this.position.x * tetrjs.config.board.blockSize, this.position.y * tetrjs.config.board.blockSize);
			tetrjs.board.occupy(this.position);
		}
	};
	function create() { 
		var rect = new Kinetic.Rect({
			x: 0, y: 0,
			width: tetrjs.config.board.blockSize,
			height: tetrjs.config.board.blockSize,
			fill: '#bada55',
			stroke: "#000",
			strokeWidth: 1
		});
		var p = new protoPiece(rect);
		tetrjs.board.occupy(p.position);
		return p;
	}
	
	tetrjs.piece = {
		create: create
	};
})(window.tetrjs = window.tetrjs || {});