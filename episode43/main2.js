window.onload = function() {
	var canvas = document.getElementById("canvas"),
	canvas2 = document.getElementById("canvas2"),
	context = canvas.getContext("2d"),
	context2 = canvas2.getContext("2d"),
	width = canvas.width = canvas2.width = window.innerWidth,
	height = canvas.height = canvas2.height = window.innerHeight,
	drawing = false;


	var arm = Arm.create(width / 2, height / 2, 100, 0),
		angle = 0,
		arm2 = Arm.create(arm.getEndX(), arm.getEndY(), 100, 1.3),
		arm3 = Arm.create(arm2.getEndX(), arm2.getEndY(), 100, 1.3)

	arm2.parent = arm;
	arm3.parent = arm2;
	context2.lineWidth = 0.25;

	update();
	document.body.addEventListener("click", function() {
		drawing = true;
	})

	function update() {
		if(drawing) {
			context2.beginPath();
			context2.moveTo(arm3.getEndX(), arm3.getEndY());
		}

		context.clearRect(0, 0, width, height);
		arm.angle = Math.sin(angle) * 2.476;
		arm2.angle = Math.cos(angle * .502 + 2) * 2.92;
		arm3.angle = Math.sin(angle * 1.498 - 0.5) * 2.34;
		arm2.x = arm.getEndX();
		arm2.y = arm.getEndY();
		arm3.x = arm2.getEndX();
		arm3.y = arm2.getEndY();
		angle += 0.05;
		arm.render(context);
		arm2.render(context);
		arm3.render(context);
		
		if(drawing) {
			context2.lineTo(arm3.getEndX(), arm3.getEndY());
			context2.stroke();
		}
		requestAnimationFrame(update);
	}
}