window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		rect = {
			x: 300,
			y: 200,
			width: -200,
			height: -100
		};

	document.body.addEventListener("mousemove", function(event) {

		context.clearRect(0, 0, width, height);
		if(utils.pointInRect(event.clientX, event.clientY, rect)) {
			context.fillStyle = "#ff6666";
		}
		else {
			context.fillStyle = "#999999";
		}
		context.fillRect(rect.x, rect.y, rect.width, rect.height);
	})
};