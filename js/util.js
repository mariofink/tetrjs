(function(tetrjs) {

	tetrjs.util = {
		TO_RADIANS: Math.PI/180,
		getRandomColor: function () {
			return '#'+Math.floor(Math.random()*16777215).toString(16);
		},
		/**
		 * Returns a random integer between min and max
		 * Using Math.round() will give you a non-uniform distribution!
		 */
		getRandomInt: function(min, max) {
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}

})(window.tetrjs = window.tetrjs || {});