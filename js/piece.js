(function(tetrjs) {
	var protoPiece = function(group) {
		this.group = group;
		this.check = function() {
			console.log("piece!", this);
		};
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
		p.check();
		return group;
	}

	tetrjs.piece = {
		create: create
	};
})(window.tetrjs = window.tetrjs || {});