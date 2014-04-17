window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		centerX = width / 2,
		centerY = height / 2,
		maxRadius = 100;

	for (var i = 0; i < 1000; i += 1) {
		var radius = Math.sqrt(Math.random()) * maxRadius,
			angle = utils.randomRange(0, Math.PI * 2),
			x = centerX + Math.cos(angle) * radius,
			y = centerY + Math.sin(angle) * radius;
		context.beginPath();
		context.arc(x, y, 1, 0, Math.PI * 2, false);
		context.fill();
	};
};