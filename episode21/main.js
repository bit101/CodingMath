window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		targetCanvas = document.getElementById("target"),
		targetContext = targetCanvas.getContext("2d"),
		width = canvas.width = targetCanvas.width = window.innerWidth,
		height = canvas.height = targetCanvas.height = window.innerHeight,
		p = particle.create(0, height / 2, 10, 0);

	targetContext.beginPath();
	targetContext.arc(width / 2, height / 2, 200, 0, Math.PI * 2, false);
	targetContext.fill();	

	update();

	function update() {
		context.clearRect(0, 0, width, height);

		p.update();
		context.beginPath();
		context.arc(p.x, p.y, 4, 0, Math.PI * 2, false);
		context.fill();

		var imageData = targetContext.getImageData(p.x, p.y, 1, 1);
		if(imageData.data[3] > 0) {
			targetContext.globalCompositeOperation = "destination-out";
			targetContext.beginPath();
			targetContext.arc(p.x, p.y, 20, 0, Math.PI * 2, false);
			targetContext.fill();

			resetParticle();
		}
		else if(p.x > width) {
			resetParticle();
		}
		requestAnimationFrame(update);
	}

	function resetParticle() {
		p.x = 0;
		p.y = height / 2;
		p.setHeading(utils.randomRange(-0.1, 0.1));
	}


};