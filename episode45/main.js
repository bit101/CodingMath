window.onload = function() {
	var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	width = canvas.width = window.innerWidth,
	height = canvas.height = window.innerHeight;


	var iks = IKSystem.create(width / 2, height / 2);
	for(var i = 0; i < 20; i++) {
		iks.addArm(30);
	}


	document.body.addEventListener("mousemove", function(event) {
		iks.drag(event.clientX, event.clientY);
	});

	update();

	function update() {
		context.clearRect(0, 0, width, height);
		
		iks.render(context);

		requestAnimationFrame(update);
	}
}