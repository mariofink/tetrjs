(function(tetrjs) {

	function init() {
		console.log("init TetrJs");
		return tetrjs.game.init();
	}

	tetrjs.init = function() {
		return init();
	};

})(window.tetrjs = window.tetrjs || {});