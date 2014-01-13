window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		p = particle.create(100, height, 10, -Math.PI / 2),
		accel = vector.create(0.1, 0.1);

	update();

	function update() {
		context.clearRect(0, 0, width, height);

		p.accelerate(accel);

		p.update();

		context.beginPath();
		context.arc(p.position.getX(), p.position.getY(), 10, 0, Math.PI * 2, false);
		context.fill();

		requestAnimationFrame(update);
	}
};