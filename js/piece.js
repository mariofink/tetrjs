(function(tetrjs) {
	var protoPiece = function(shape) {
		_self = this;
		this.position = {x: tetrjs.config.board.width/2, y: 0}; // start in the top middle
		this.group = new Kinetic.Group({
			x: this.position.x * tetrjs.config.board.blockSize, y: 0 * tetrjs.config.board.blockSize
		});
		this.group.add(shape);
		this.down = function() {
			this.group.setY(this.group.getY() + tetrjs.config.board.blockSize);
		}
		this.left = function() {
			this.group.setX(this.group.getX() - tetrjs.config.board.blockSize);
		}
		this.right = function() {
			this.group.setX(this.group.getX() + tetrjs.config.board.blockSize);
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
		return p;
	}
	
	tetrjs.piece = {
		create: create
	};
})(window.tetrjs = window.tetrjs || {});