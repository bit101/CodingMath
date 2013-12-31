window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		xres = 10,
		yres = 11;

	context.fillStyle = "black";
	context.fillRect(0, 0, width, height);
	context.fillStyle = "green";
	context.font = "12px Courier";
	context.translate(width / 2, height / 2);	
	// context.scale(1.5, 1.5);
	// context.rotate(.1);	
	context.transform(1.5, .3, 0.1, 1.5, 0, 0);

	for(var y = -height / 2; y < height / 2; y += yres) {
		for(var x = -width / 2; x < width / 2; x += xres) {
			var char = Math.random() < .5 ? "0" : "1";
			context.fillText(char, x, y);
		}
	}
};