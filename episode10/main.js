window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		ship = particle.create(width / 2, height / 2, 0, 0),
		thrust = vector.create(0, 0),
		angle = 0,
		turningLeft = false,
		turningRight = false,
		thrusting = false;

	update();


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
				break;

			default:
				break;
				
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
				break;

			default:
				break;
				
		}
	});

	function update() {
		context.clearRect(0, 0, width, height);

		if(turningLeft) {
			angle -= 0.05;
		}
		if(turningRight) {
			angle += 0.05;
		}

		thrust.setAngle(angle);

		if(thrusting) {
			thrust.setLength(0.1);
		}
		else {
			thrust.setLength(0);
		}

		// animation goes here
		ship.accelerate(thrust);
		ship.update();

		context.save();
		context.translate(ship.position.getX(), ship.position.getY());
		context.rotate(angle);

		context.beginPath();
		context.moveTo(10, 0);
		context.lineTo(-10, -7);
		context.lineTo(-10, 7);
		context.lineTo(10, 0);
		if(thrusting) {
			context.moveTo(-10, 0);
			context.lineTo(-18, 0);
		}
		context.stroke();

		context.restore(); 	

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
	
		requestAnimationFrame(update);
	}
};