(function(tetrjs) {
	var protoPiece = function(group) {
		_self = this;
		this.group = group;
		this.move = function() {
			if (collided() === true) return;
			this.group.setY(this.group.getY()+1);
		};
		function collided() {
			var position = _self.group.getPosition();
			console.log(position.y, tetrjs.config.board.height);
			if (position.y >= tetrjs.config.board.height) {
				return true;
			}
			return false;
		}
	};
	function create() {
		var group = new Kinetic.Group({
			x:0, y:0
		});
		var rect = new Kinetic.Rect({
			x: 0, y: 0,
			width: 24,
			height: 24,
			fill: '#bada55',
			stroke: "#000",
			strokeWidth: 1
		});
		group.add(rect);
		var p = new protoPiece(group);
		return p;
	}
	
	tetrjs.piece = {
		create: create
	};
})(window.tetrjs = window.tetrjs || {});