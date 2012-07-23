(function(tetrjs) {

	tetrjs.util = {
		TO_RADIANS: Math.PI/180,
		getRandomColor: function () {
			return '#'+Math.floor(Math.random()*16777215).toString(16);
		}
	}

})(window.tetrjs = window.tetrjs || {});