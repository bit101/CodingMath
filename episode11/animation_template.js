window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	update();


	function update() {
		context.clearRect(0, 0, width, height);

		// animation goes here
	
		requestAnimationFrame(update);
	}
};