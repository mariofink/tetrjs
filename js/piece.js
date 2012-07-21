(function(tetrjs) {
	var protoPiece = function(shape) {
		_self = this;
		this.position = {x: tetrjs.config.board.width/2, y: 0}; // start in the top middle
		this.group = new Kinetic.Group({
			x: this.position.x * tetrjs.config.board.blockSize, y: 0 * tetrjs.config.board.blockSize
		});
		this.group.add(shape);
		this.down = function() {
			var newPosition = {x: this.position.x, y: this.position.y + 1};
			// stop if piece is in one of the bottom tiles
			if ( (newPosition.y == tetrjs.config.board.height) || (tetrjs.board.isOccupied(newPosition)) ) {
				tetrjs.game.blockify(this);
				return false;
			}
			tetrjs.board.release(this.position);
			this.group.setY(this.group.getY() + tetrjs.config.board.blockSize);
			this.position = newPosition;
			tetrjs.board.occupy(this.position);
		};
		this.left = function() {
			// stop if the piece is at the left border
			if (this.position.x == 0) return false;
			tetrjs.board.release(this.position);
			this.group.setX(this.group.getX() - tetrjs.config.board.blockSize);
			this.position.x = this.position.x - 1;
			tetrjs.board.occupy(this.position);
		};
		this.right = function() {
			// stop if the piece is at the right border
			if (this.position.x + 1 == tetrjs.config.board.width) return false;
			tetrjs.board.release(this.position);
			this.group.setX(this.group.getX() + tetrjs.config.board.blockSize);
			this.position.x = this.position.x + 1;
			tetrjs.board.occupy(this.position);
		};
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