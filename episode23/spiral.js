window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		fl = 300,
		cards = [],
		numCards = 200,
		centerZ = 2000,
		radius = 1000,
		baseAngle = 0,
		rotationSpeed = 0.01;


	for(var i = 0; i < numCards; i += 1) {
		var card = {
			angle: 0.2 * i,
			y: 2000 - 4000 / numCards * i,
			img: document.createElement("img")
		};
		card.x = Math.cos(card.angle + baseAngle) * radius;
		card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
		cards.push(card);
	}

	context.translate(width / 2, height / 2);
	context.font = "200px Arial";

	document.body.addEventListener("mousemove", function(event) {
		rotationSpeed = (event.clientX - width / 2) * 0.00005;
		ypos = (event.clientY - height / 2) * 2;
	});

	update();

	function update() {
		baseAngle += rotationSpeed;
		cards.sort(zsort);
		context.clearRect(-width / 2, -height / 2, width, height);
		for(var i = 0; i < numCards; i += 1) {
			var card = cards[i],
				perspective = fl / (fl + card.z);

			context.save();
			context.scale(perspective, perspective);
			context.translate(card.x, card.y);

			context.beginPath();
			context.arc(0, 0, 40, 0, Math.PI * 2, false);
			context.fill();

			context.restore();

			card.x = Math.cos(card.angle + baseAngle) * radius;
			card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
		}
		requestAnimationFrame(update);
	}

	function zsort(cardA, cardB) {
		return cardB.z - cardA.z;
	}
};