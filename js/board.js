(function(tetrjs) {
	var matrix = null;
	function createMatrix(width, height) {
		// if matrix has already been created, simply return it
		if (matrix !== null) return matrix;
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
	tetrjs.board = {
		getMatrix: function() {
			return createMatrix(10,18);
		}
	};
})(window.tetrjs = window.tetrjs || {});