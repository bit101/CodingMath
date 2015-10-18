var Arm = Arm || {
	x: 0,
	y: 0,
	length: 100,
	angle: 0,
	centerAngle: 0,
	rotationRange: Math.PI / 4,
	parent: null,
	phaseOffset: 0,

	create: function(length, centerAngle, rotationRange, phaseOffset) {
		var obj = Object.create(this);
		obj.init(length, centerAngle, rotationRange, phaseOffset);
		return obj;
	},

	init: function(length, centerAngle, rotationRange, phaseOffset) {
		this.length = length;
		this.centerAngle = centerAngle;
		this.rotationRange = rotationRange;
		this.phaseOffset = phaseOffset;
	},

	setPhase: function(phase) {
		this.angle = this.centerAngle + Math.sin(phase + this.phaseOffset) * this.rotationRange;
	},

	getEndX: function() {
		var angle = this.angle,
			parent = this.parent;
		while(parent) {
			angle += parent.angle;
			parent = parent.parent;
		}
		return this.x + Math.cos(angle) * this.length;
	},

	getEndY: function() {
		var angle = this.angle,
			parent = this.parent;
		while(parent) {
			angle += parent.angle;
			parent = parent.parent;
		}
		return this.y + Math.sin(angle) * this.length;
	},

	render: function(context) {
		context.strokeStyle = "#000000";
		context.lineWidth = 5;
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(this.getEndX(), this.getEndY());
		context.stroke();
	}


};