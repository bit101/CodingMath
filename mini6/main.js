window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		centerX = width / 2,
		centerY = height / 2;

	function distanceXY(x0, y0, x1, y1) {
		var dx = x1 - x0,
			dy = y1 - y0;
		return Math.sqrt(dx * dx + dy * dy);
	}

	document.body.addEventListener("mousemove", function(event) {
		context.clearRect(0, 0, width, height);

		var dist = distanceXY(centerX, centerY, event.clientX, event.clientY);
		if(dist < 100) {
			context.fillStyle = "#ff6666";
		}
		else {
			context.fillStyle = "#cccccc";
		}

		context.beginPath();
		context.arc(centerX, centerY, 100, 0, Math.PI * 360, false);
		context.fill();
	});
};