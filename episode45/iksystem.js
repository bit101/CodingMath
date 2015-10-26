var IKSystem = IKSystem || {
	x: 0,
	y: 0,
	arms: null,
	lastArm: null,


	create: function(x, y) {
		var obj = Object.create(this);
		obj.init(x, y);
		return obj;
	},

	init: function(x, y) {
		this.x = x;
		this.y = y;
		this.arms = [];
	},

	addArm: function(length) {
		var arm = Arm.create(0, 0, length, 0);
		if(this.lastArm) {
			arm.x = this.lastArm.getEndX();
			arm.y = this.lastArm.getEndY();
			arm.parent = this.lastArm;
		}
		else {
			arm.x = this.x;
			arm.y = this.y;
		}
		this.arms.push(arm);
		this.lastArm = arm;
	},

	render: function(context) {
		for(var i = 0; i < this.arms.length; i++) {
			this.arms[i].render(context);
		}
	},

	drag: function(x, y) {
		this.lastArm.drag(x, y);
	}

};