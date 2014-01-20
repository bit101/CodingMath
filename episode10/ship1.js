window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		ship = particle.create(width / 2, height / 2, 0, 0),
		thrust = vector.create(0, 0);

	update();


	document.body.addEventListener("keydown", function(event) {
		// console.log(event.keyCode);
		switch(event.keyCode) {
			case 38: // up
				thrust.setY(-0.1);
				break;
				
			case 40: // down
				thrust.setY(0.1);
				break;
				
			case 37: // left
				thrust.setX(-0.1);
				break;
				
			case 39: // right
				thrust.setX(0.1);
				break;

			default:
				break;
				
		}
	});

	document.body.addEventListener("keyup", function(event) {
		// console.log(event.keyCode);
		switch(event.keyCode) {
			case 38: // up
				thrust.setY(0);
				break;
				
			case 40: // down
				thrust.setY(0);
				break;
				
			case 37: // left
				thrust.setX(0);
				break;
				
			case 39: // right
				thrust.setX(0);
				break;

			default:
				break;
				
		}
	});

	function update() {
		context.clearRect(0, 0, width, height);

		// animation goes here
		ship.accelerate(thrust);
		ship.update();

		context.beginPath();
		context.arc(ship.position.getX(), ship.position.getY(), 10, 0, Math.PI * 2, false);
		context.fill();

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