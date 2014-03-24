window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		results = [],
		running = true;

	document.body.addEventListener("click", function() {
		running = !running;
	});

	for(var i = 0; i < width; i += 1) {
		results[i] = 0;
	}

	update();

	function update() {

		for(var n = 0; n < 1000; n += 1) {
			addResult();
		}
		for(var i = 0; i < width; i += 1) {
			var h = -results[i];
			context.fillRect(i, height, 1, h );
		}
		if(running) {
			requestAnimationFrame(update);
		}
	}	

	function addResult() {
		var iterations = 2,
			total = 0;

		for(var i = 0; i < iterations; i += 1) {
			total += utils.randomRange(0, width);
		}
		result = Math.floor(total / iterations);

		results[result] += 1;
	}

};