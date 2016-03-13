window.onload = function() {
	var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	width = canvas.width = window.innerWidth,
	height = canvas.height = window.innerHeight;

	var prizes = [{
		prize: "nothing!",
		chance: 8
	},
	{
		prize: "a gold piece",
		chance: 5
	},
	{
		prize: "a treasure chest",
		chance: 2
	},
	{
		prize: "poison",
		chance: 1
	},
	{
		prize: "food",
		chance: 3
	}
	];

	document.body.addEventListener("click", function() {
		var prize = getPrize();

		console.log("You won " + prize);

	});

	function getPrize(rand) {
		var total = 0;
		for(var i = 0; i < prizes.length; i++) {
			total += prizes[i].chance;
		}

		var rand = Math.random() * total;

		for(var i = 0; i < prizes.length; i++) {
			var prize = prizes[i];
			if(rand < prize.chance) {
				return prize.prize;
			}
			rand -= prize.chance;
		}

	}
}