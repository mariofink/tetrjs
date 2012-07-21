(function(tetrjs) {

	function init() {
		return tetrjs.game.init();
	}

	tetrjs.init = function() {
		return init();
	};
	
	tetrjs.config = {
		board: {
			width: 10,
			height: 18,
			blockSize: 24
		} 
	}

})(window.tetrjs = window.tetrjs || {});