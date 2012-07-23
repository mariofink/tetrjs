(function(tetrjs) {
	var Block = function(x,y,fill) {
		return new Kinetic.Rect({
			x: x * tetrjs.config.board.blockSize,
			y: y * tetrjs.config.board.blockSize,
			width: tetrjs.config.board.blockSize,
			height: tetrjs.config.board.blockSize,
			fill: fill,
			strokeWidth: 1,
			strokeColor: "black",
			detectionType: "path",
			offset: [tetrjs.config.board.blockSize/2,tetrjs.config.board.blockSize/2]
		});
	}
	var Shape_S = function (pos) {
		var shape = new tetrjs.Tetromino(pos);
		var group = new Kinetic.Group();
		var color = tetrjs.util.getRandomColor();
		group.add(new Block(0, 1, color));
		group.add(new Block(1, 1, color));
		group.add(new Block(1, 0, color));
		group.add(new Block(2, 0, color));
		shape.addShape(group);
		return shape;
	}
	var Shape_Z = function (pos) {
		var shape = new tetrjs.Tetromino(pos);
		var group = new Kinetic.Group();
		var color = tetrjs.util.getRandomColor();
		group.add(new Block(0,0, color));
		group.add(new Block(1,0, color));
		group.add(new Block(1,1, color));
		group.add(new Block(2,1, color));
		shape.addShape(group);
		return shape;
	}
	var Shape_O = function (pos) {
		var shape = new tetrjs.Tetromino(pos);
		var group = new Kinetic.Group();
		var color = tetrjs.util.getRandomColor();
		group.add(new Block(0,0, color));
		group.add(new Block(1,0, color));
		group.add(new Block(1,1, color));
		group.add(new Block(0,1, color));
		shape.addShape(group);
		return shape;
	}
	var Shape_I = function (pos) {
		var shape = new tetrjs.Tetromino(pos);
		var group = new Kinetic.Group();
		var color = tetrjs.util.getRandomColor();
		group.add(new Block(0,0, color));
		group.add(new Block(0,1, color));
		group.add(new Block(0,2, color));
		group.add(new Block(0,3, color));
		shape.addShape(group);
		return shape;
	}
	var Shape_T = function (pos) {
		var shape = new tetrjs.Tetromino(pos);
		var group = new Kinetic.Group();
		var color = tetrjs.util.getRandomColor();
		group.add(new Block(0,0, color));
		group.add(new Block(1,0, color));
		group.add(new Block(2,0, color));
		group.add(new Block(2,1, color));
		shape.addShape(group);
		return shape;
	}
	var Shape_L = function (pos) {
		var shape = new tetrjs.Tetromino(pos);
		var group = new Kinetic.Group();
		var color = tetrjs.util.getRandomColor();
		group.add(new Block(0,0, color));
		group.add(new Block(0,1, color));
		group.add(new Block(0,2, color));
		group.add(new Block(1,2, color));
		shape.addShape(group);
		return shape;
	}
	var Shape_J = function (pos) {
		var shape = new tetrjs.Tetromino(pos);
		var group = new Kinetic.Group();
		var color = tetrjs.util.getRandomColor();
		group.add(new Block(1,0, color));
		group.add(new Block(1,1, color));
		group.add(new Block(1,2, color));
		group.add(new Block(0,2, color));
		shape.addShape(group);
		return shape;
	}

	tetrjs.shapes = {
		Shape_S: Shape_S,
		Shape_Z: Shape_Z,
		Shape_O: Shape_O,
		Shape_I: Shape_I,
		Shape_T: Shape_T,
		Shape_L: Shape_L,
		Shape_J: Shape_J
	}
	
})(window.tetrjs = window.tetrjs || {});