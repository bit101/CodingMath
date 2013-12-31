window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	context.translate(0, height / 2);
	context.scale(1, -1);

	for(var angle = 0; angle < Math.PI * 2; angle += .01) {
		var x = angle * 200,
			y = Math.sin(angle) * 200;

		context.fillStyle = "black";
		context.fillRect(x, y, 5, 5);

		y = Math.cos(angle) * 200;
		context.fillStyle = "red";
		context.fillRect(x, y, 5, 5);
	}
};