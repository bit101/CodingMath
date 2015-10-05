window.onload = function() {
	var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	width = canvas.width = window.innerWidth,
	height = canvas.height = window.innerHeight;


	var arm = Arm.create(width / 2, height / 2, 100, 0),
		angle = 0,
		arm2 = Arm.create(arm.getEndX(), arm.getEndY(), 100, 1.3),
		arm3 = Arm.create(arm2.getEndX(), arm2.getEndY(), 100, 1.3)

	arm2.parent = arm;
	arm3.parent = arm2;

	update();

	function update() {
		context.clearRect(0, 0, width, height);
		arm.angle = Math.sin(angle) * 1.2;
		arm2.angle = Math.cos(angle * .5) * .92;
		arm3.angle = Math.sin(angle * 1.5) * 1.34;
		arm2.x = arm.getEndX();
		arm2.y = arm.getEndY();
		arm3.x = arm2.getEndX();
		arm3.y = arm2.getEndY();
		angle += 0.05;
		arm.render(context);
		arm2.render(context);
		arm3.render(context);
		requestAnimationFrame(update);
	}
}