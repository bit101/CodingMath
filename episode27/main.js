window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,

		target = {
			x: width,
			y: Math.random() * height
		},

		position = {
			x: 0,
			y: Math.random() * height
		},

		ease = 0.1;

	update();

	document.body.addEventListener("mousemove", function(event) {
		target.x = event.clientX;
		target.y = event.clientY;
	});

	function update() {
		context.clearRect(0, 0, width, height);

		context.beginPath();
		context.arc(position.x, position.y, 10, 0, Math.PI * 2, false);
		context.fill();


		var dx = target.x - position.x,
			dy = target.y - position.y,
			vx = dx * ease,
			vy = dy * ease;

		position.x += vx;
		position.y += vy;


		requestAnimationFrame(update);
	}

};