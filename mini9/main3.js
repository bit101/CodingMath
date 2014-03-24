window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	for(var i = 0; i < 100000; i += 1) {
		var x = utils.randomDist(0, width, 5),
			y = utils.randomDist(0, height, 5);

		context.fillRect(x, y, 1, 1);
	}

};