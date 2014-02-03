window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		particles = [];


	update();

	function update() {
		context.clearRect(0, 0, width, height);

		// if we have less than 100 particles, create one and add it to the array
		// once we have 100, this will be skipped.
		if(particles.length < 100) {
			var p = particle.create(width / 2, height, 5 + Math.random() * 8, -Math.PI / 2 + (Math.random() * .2 - .1), 0.1);
			p.radius = Math.random() * 10 + 2;
			particles.push(p);
		}

		for(var i = 0; i < particles.length; i += 1) {
			var p = particles[i];

			p.update();

			context.beginPath();
			context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
			context.fill();

			if(p.position.getY() - p.radius > height) {
				p.position.setX(width / 2);
				p.position.setY(height);
				p.velocity.setLength(5 + Math.random() * 8);
				p.velocity.setAngle(-Math.PI / 2 + (Math.random() * .2 - .1));
			}
		}

		requestAnimationFrame(update);
	}

};