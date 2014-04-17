window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		particles = [];

	for (var i = 0; i < 200; i += 1) {
		var p = particle.create(width / 2, height / 2, 0, 0);
		p.vx = utils.randomRange(-1, 1);
		p.vy = utils.randomRange(-1, 1);
		particles.push(p);
	};

	update();

	function update() {
		context.clearRect(0, 0, width, height);
		for(var i = 0; i < 200; i += 1) {
			var p = particles[i];
			p.update();
			context.beginPath();
			context.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
			context.fill();
		}
		requestAnimationFrame(update);
	}
};