window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		sun = particle.create(width / 2, height / 2, 0, 0),
		planet = particle.create(width / 2 + 200, height / 2, 10, -Math.PI / 2);

	sun.mass = 100000;

	update();


	function update() {
		context.clearRect(0, 0, width, height);

		planet.gravitateTo(sun);
		planet.update();

		context.beginPath();
		context.fillStyle = "#ffff00";
		context.arc(sun.position.getX(), sun.position.getY(), 20, 0, Math.PI * 2, false);
		context.fill();

		context.beginPath();
		context.fillStyle = "#0000ff";
		context.arc(planet.position.getX(), planet.position.getY(), 5, 0, Math.PI * 2, false);
		context.fill();

		// animation goes here

		requestAnimationFrame(update);
	}
};