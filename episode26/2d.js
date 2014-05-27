window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		point = {
			x: 300,
			y: 200
		},
		delta = 0.05;

	context.translate(width / 2, height / 2);

	update();

	function update() {
		context.clearRect(-width / 2, -height / 2, width, height);

		context.beginPath();
		context.arc(point.x, point.y, 20, 0, Math.PI * 2, false);
		context.fill();

		var cos = Math.cos(delta),
			sin = Math.sin(delta),
			x = point.x * cos - point.y * sin,
			y = point.y * cos + point.x * sin;

		point.x = x;
		point.y = y;

		requestAnimationFrame(update);
	}
};