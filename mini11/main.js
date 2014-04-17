window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		handle = {
			x: width / 2,
			y: height / 2,
			radius: 20
		},
		offset = {};

	draw();

	function draw() {
		context.clearRect(0, 0, width, height);

		context.fillStyle = "gray";
		context.beginPath();
		context.arc(handle.x, handle.y, handle.radius, 0, Math.PI * 2, false);
		context.fill();
	}

	document.body.addEventListener("mousedown", function(event) {
		if(utils.circlePointCollision(event.clientX, event.clientY, handle)) {
			document.body.addEventListener("mousemove", onMouseMove);
			document.body.addEventListener("mouseup", onMouseUp);
			offset.x = event.clientX - handle.x;
			offset.y = event.clientY - handle.y;
		}
	});

	function onMouseMove(event) {
		handle.x = event.clientX;// - offset.x;
		handle.y = event.clientY;// - offset.y;
		draw();
	}

	function onMouseUp(event) {
		document.body.removeEventListener("mousemove", onMouseMove);
		document.body.removeEventListener("mouseup", onMouseUp);
	}


};