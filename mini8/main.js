window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		gridSize = 40;

	drawGrid();

	document.body.addEventListener("mousemove", function(event) {
		context.clearRect(0, 0, width, height);
		drawGrid();

		var x = utils.roundNearest(event.clientX, gridSize),
			y = utils.roundNearest(event.clientY, gridSize);

		context.beginPath();
		context.arc(x, y, 20, 0, Math.PI * 2, false);
		context.fill();
	});

	function drawGrid() {
		context.beginPath();
		context.strokeStyle = "#ccc";
		for(var x = 0; x <= width; x += gridSize) {
			context.moveTo(x, 0);
			context.lineTo(x, height);
		}
		for(var y = 0; y <= height; y += gridSize) {
			context.moveTo(0, y);
			context.lineTo(width, y);
		}
		context.stroke();
	}

};