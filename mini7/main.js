window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var angle = Math.PI / 4;
	
	context.translate(width / 2, height / 2);
	context.rotate(angle);

	context.beginPath();
	context.arc(0, 0, 20, 0, Math.PI * 2, 0);
	context.fill();

	context.lineWidth = 10;
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(50, 0);
	context.stroke();
};