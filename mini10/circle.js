window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		centerX = width / 2,
		centerY = height / 2,
		maxRadius = 100;

	for (var i = 0; i < 10; i += 1) {
		var radius = 20,
			angle = Math.PI * 2 / 10 * i,
			x = centerX + Math.cos(angle) * radius,
			y = centerY + Math.sin(angle) * radius;
		context.beginPath();
		context.arc(x, y, 5, 0, Math.PI * 2, false);
		context.fill();
	}
	for (var i = 0; i < 10; i += 1) {
		var radius = 100,
			angle = Math.PI * 2 / 10 * i,
			x = centerX + Math.cos(angle) * radius,
			y = centerY + Math.sin(angle) * radius;
		context.beginPath();
		context.arc(x, y, 5, 0, Math.PI * 2, false);
		context.fill();
	}
};