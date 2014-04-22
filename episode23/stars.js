window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		fl = 300,
		cards = [],
		numCards = 20,
		centerZ = 1000,
		ypos = 0,
		radius = 1000,
		baseAngle = 0,
		rotationSpeed = 0.01,
		star = document.createElement("img");

	star.src = "star.png"

	for(var i = 0; i < numCards; i += 1) {
		var card = {
			angle: Math.PI * 2 / numCards * i,
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
			context.translate(card.x, ypos);

			context.translate(-card.img.width / 2, -card.img.height / 2);
			context.drawImage(star, 0, 0);

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