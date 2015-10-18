window.onload = function() {
	var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	width = canvas.width = window.innerWidth,
	height = canvas.height = window.innerHeight;


	var leg0 = FKSystem.create(width / 2, height / 2);
	var leg1 = FKSystem.create(width / 2, height / 2);
	leg1.phase = Math.PI;

	leg0.addArm(200, Math.PI / 2, Math.PI / 4, 0);
	leg0.addArm(180, 0.87, 0.87, -1.5);
	leg1.addArm(200, Math.PI / 2, Math.PI / 4, 0);
	leg1.addArm(180, 0.87, 0.87, -1.5);


	update();

	function update() {
		context.clearRect(0, 0, width, height);
		
		leg0.update();
		leg0.render(context);
		leg1.update();
		leg1.render(context);

		requestAnimationFrame(update);
	}
}