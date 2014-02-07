var utils = {
	norm: function(value, min, max) {
		return (value - min) / (max - min);
	},

	lerp: function(norm, min, max) {
		return (max - min) * norm + min;
	},

	map: function(value, sourceMin, sourceMax, destMin, destMax) {
		return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
	},

	clamp: function(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}
}