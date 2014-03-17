window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		sun1 = particle.create(300, 200, 0, 0),
		sun2 = particle.create(800, 600, 0, 0),
		emitter = {
			x: 100,
			y: 0
		},
		particles = [],
		numParticles = 100;


	sun1.mass = 10000;
	sun1.radius = 10;
	sun2.mass = 20000;
	sun2.radius = 20;
	
	for(var i = 0; i < numParticles; i += 1) {
		var p = particle.create(emitter.x, emitter.y, utils.randomRange(7, 8), Math.PI / 2 + utils.randomRange(-0.1, 0.1));
		p.addGravitation(sun1);
		p.addGravitation(sun2);
		p.radius = 3;
		particles.push(p);
	}


	update();

	function update() {
		context.clearRect(0, 0, width, height);

		draw(sun1, "yellow");
		draw(sun2, "yellow");

		for(var i = 0; i < numParticles; i += 1) {
			var p = particles[i];
			p.update();
			draw(p, "black");
			if(p.x > width ||
				p.x < 0 ||
				p.y > height ||
				p.y < 0) {
				p.x = emitter.x;
				p.y = emitter.y;
				p.setSpeed(utils.randomRange(7, 8));
				p.setHeading(Math.PI / 2 + utils.randomRange(-.1, .1));
			}
		}

		requestAnimationFrame(update);
	}

	function draw(p, color) {
		context.fillStyle = color;
		context.beginPath();
		context.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
		context.fill();
	}

};