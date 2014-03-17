window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		springPoint = {
			x: width / 2, 
			y: height / 2
		},
		springPoint2 = {
			x: utils.randomRange(0, width),
			y: utils.randomRange(0, height)
		},
		weight = particle.create(Math.random() * width, Math.random() * height, 
								50, Math.random() * Math.PI * 2, 0.5),
		k = 0.1,
		springLength = 100;

	weight.radius = 20;
	weight.friction = 0.95;
	weight.addSpring(springPoint, k, springLength);
	weight.addSpring(springPoint2, k, springLength);

	document.body.addEventListener("mousemove", function(event) {
		springPoint.x = event.clientX ;
		springPoint.y = event.clientY;
	});


	update();

	function update() {
		context.clearRect(0, 0, width, height);

		weight.update();

		context.beginPath();
		context.arc(weight.x, weight.y, weight.radius,
					0, Math.PI * 2, false);
		context.fill();

		context.beginPath();
		context.arc(springPoint.x, springPoint.y, 4,
					0, Math.PI * 2, false);
		context.fill();

		context.beginPath();
		context.moveTo(springPoint2.x, springPoint2.y);
		context.lineTo(weight.x, weight.y);
		context.lineTo(springPoint.x, springPoint.y);
		context.stroke();

		requestAnimationFrame(update);
	}

};