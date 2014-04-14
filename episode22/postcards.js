window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		fl = 300,
		cards = [],
		numCards = 21;

	for(var i = 0; i < numCards; i += 1) {
		var card = {
			x: utils.randomRange(-1000, 1000),
			y: utils.randomRange(-1000, 1000),
			z: utils.randomRange(0, 5000),
			img: document.createElement("img")
		};
		card.img.src = "postcard" + (i % 7) + ".jpg";
		cards.push(card);
	}

	context.translate(width / 2, height / 2);
	context.font = "200px Arial";

	update();

	function update() {
		context.clearRect(-width / 2, -height / 2, width, height);
		for(var i = 0; i < numCards; i += 1) {
			var card = cards[i],
				perspective = fl / (fl + card.z);

			context.save();
			context.translate(card.x * perspective, card.y * perspective);
			context.scale(perspective, perspective);

			context.translate(-card.img.width / 2, -card.img.height / 2);
			context.drawImage(card.img, 0, 0);

			context.restore();

			card.z -= 5;
			if(card.z < 0) {
				card.z = 5000;
			}
		}
		requestAnimationFrame(update);
	}
};