window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	function norm(value, min, max) {
		return (value - min) / (max - min);
	}

	function lerp(norm, min, max) {
		return (max - min) * norm + min;
	}

	function map(value, sourceMin, sourceMax, destMin, destMax) {
		return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
	}

	document.body.addEventListener("mousemove", function(event) {
		var radius = map(event.clientY,
						 0, height,
						 20, 340);

		context.clearRect(0, 0, width, height);
		context.beginPath();
		context.arc(width / 2, height / 2, radius, 0, Math.PI * 2, false);
		context.fill();
	});

};