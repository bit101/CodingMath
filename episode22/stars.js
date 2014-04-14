window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	context.fillRect(0, 0, width, height);
	context.fillStyle = "white";

	for(var i = 0; i < 800; i += 1) {
		context.beginPath();
		context.arc(utils.randomRange(0, width),
					utils.randomRange(0, height),
					utils.randomRange(0, 1),
					0, Math.PI * 2, false);
		context.fill();
	}


};