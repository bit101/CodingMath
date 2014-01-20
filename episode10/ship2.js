window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight
		ship = particle.create(width / 2, height / 2, 0, 0),
		thrust = vector.create(0, 0),
		angle = 0,
		turningLeft = false,
		turningRight = false,
		thrusting = false;

	document.body.addEventListener("keydown", function(event) {
		// console.log(event.keyCode);
		switch(event.keyCode) {
			case 38: // up
				thrusting = true;
				break;
			case 37: // left
				turningLeft = true;
				break;
			case 39: // right
				turningRight = true;
			default:
				break
		}
	});

	document.body.addEventListener("keyup", function(event) {
		// console.log(event.keyCode);
		switch(event.keyCode) {
			case 38: // up
				thrusting = false;
				break;
			case 37: // left
				turningLeft = false;
				break;
			case 39: // right
				turningRight = false;
			default:
				break
		}
	});

	update();

	function update() {
		context.clearRect(0, 0, width, height);

		if(turningRight) {
			angle += .05;
		}
		if(turningLeft) {
			angle -= .05;
		}

		if(thrusting) {
			thrust.setLength(.1);
		}
		else {
			thrust.setLength(0);
		}
		thrust.setAngle(angle);

		ship.accelerate(thrust);
		ship.update();

		if(ship.position.getX() > width) {
			ship.position.setX(0);
		}
		if(ship.position.getX() < 0) {
			ship.position.setX(width);
		}
		if(ship.position.getY() > height) {
			ship.position.setY(0);
		}
		if(ship.position.getY() < 0) {
			ship.position.setY(height);
		}

		context.save();
		
		context.translate(ship.position.getX(), ship.position.getY());
		context.rotate(angle);
		context.beginPath();
		context.moveTo(10, 0);
		context.lineTo(-10, -7);
		context.lineTo(-10, 7	);
		context.lineTo(10, 0);
		if(thrusting) {
			context.moveTo(-10, 0);
			context.lineTo(-18, 0);
		}
		context.stroke();

		context.restore();

		requestAnimationFrame(update);
	}
};