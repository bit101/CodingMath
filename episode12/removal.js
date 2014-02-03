window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		particles = [];

	for(var i = 0; i < 100; i += 1) {
		var p = particle.create(width / 2, height / 2, Math.random() * 5 + 2, Math.random() * Math.PI * 2);
		p.radius = 10;
		particles.push(p);
	}

	update();

	function update() {
		context.clearRect(0, 0, width, height);

		console.log(particles.length);


		for(var i = 0; i < particles.length; i += 1) {
			var p = particles[i];

			p.update();

			context.beginPath();
			context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
			context.fill();

		}

		removeDeadParticles();

		requestAnimationFrame(update);
	}


	function removeDeadParticles() {
		for(var i = particles.length - 1; i >= 0; i -= 1) {
			var p = particles[i];
			if(p.position.getX() - p.radius > width ||
			   p.position.getX() + p.radius < 0 ||
			   p.position.getY() - p.radius > height ||
			   p.position.getY() + p.radius < 0) {

			   	particles.splice(i, 1);
			}
		}
	}
};