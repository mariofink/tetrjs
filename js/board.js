(function(tetrjs) {
	var matrix = null;
	/**
		Create a 2d array that represents the tiles of the playing board
	**/
	function getMatrix() {
		// if matrix has already been created, simply return it
		if (matrix !== null) return matrix;
		var width = tetrjs.config.board.width;
		var height = tetrjs.config.board.height;		
		matrix = [];
		for (var i = 0; i < height; i++) {
			var a = [];
			for (var j = 0; j < width; j++) {
				a.push(0);
			}
			matrix.push(a);
		}
		return matrix;
	}
	function occupy(position) {
		getMatrix()[position.y][position.x] = 1;
	}
	function release(position) {
		getMatrix()[position.y][position.x] = 0;
	}
	function isOccupied(position) {
		if (getMatrix()[position.y][position.x] === 1) return true;
		return false;
	}
	tetrjs.board = {
		getMatrix: getMatrix,
		occupy: occupy,
		isOccupied: isOccupied,
		release: release
	};
})(window.tetrjs = window.tetrjs || {});