window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,

		target = {
			x: width,
			y: Math.random() * height
		},

		points = [],
		numPoints = 50,
		ease = 0.25;

	for(var i = 0; i < numPoints; i++) {
		points.push({
			x: 0,
			y: 0
		});
	}

	update();

	document.body.addEventListener("mousemove", function(event) {
		target.x = event.clientX;
		target.y = event.clientY;
	});

	function update() {
		context.clearRect(0, 0, width, height);

		var leader = {
			x: target.x,
			y: target.y
		};

		context.beginPath();
		context.moveTo(leader.x, leader.y);

		for(var i = 0; i < numPoints; i++) {
			var point = points[i];
			point.x += (leader.x - point.x) * ease;
			point.y += (leader.y - point.y) * ease;

			context.lineTo(point.x, point.y);

			leader.x = point.x;
			leader.y = point.y;
		}

		context.stroke();

		requestAnimationFrame(update);
	}

};