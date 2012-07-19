(function(tetrjs) {

	function init() {
		console.log("init TetrJs");
		return tetrjs.game.init();
	}

	tetrjs.init = function() {
		return init();
	};
	
	tetrjs.config = {
		board: {
			width: 320,
			height: 576
		}
	}

})(window.tetrjs = window.tetrjs || {});