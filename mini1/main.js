window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,

		values = [7, 5, 21, 18, 33, 12, 27, 18, 9, 23, 14, 6, 31, 25, 17, 13, 29],
		min = Math.min.apply(null, values),
		max = Math.max.apply(null, values);

	function norm(value, min, max) {
		return (value - min) / (max - min);
	}

	context.beginPath();

	for(var i = 0; i < values.length; i += 1) {
		var normValue = norm(values[i], min, max),
			x = width / (values.length - 1) * i,
			y = height - height * normValue;

		if(i == 0) {
			context.moveTo(x, y);
		}
		else {
			context.lineTo(x, y);
		}
	}

	context.stroke();

	// bonus material! you can also plot the points

	for(var i = 0; i < values.length; i += 1) {
		var normValue = norm(values[i], min, max),
			x = width / (values.length - 1) * i,
			y = height - height * normValue;
		context.beginPath();
		context.arc(x, y, 4, 0, Math.PI * 2, false);
		context.fill();
	}
};