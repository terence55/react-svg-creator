export default function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.fromAngle = function (angle, magnitude) {
  if (typeof magnitude !== 'number') {
    magnitude = 1;
  }
  return new Vector(
    magnitude * Math.cos(angle),
    magnitude * Math.sin(angle)
  );
};

Vector.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

Vector.prototype.add = function (v) {
  return new Vector(this.x + v.x, this.y + v.y);
}

Vector.prototype.subtract = function (v) {
  return new Vector(this.x - v.x, this.y - v.y);
}

Vector.prototype.multiply = function (s) {
  return new Vector(this.x * s, this.y * s);
}

Vector.prototype.divide = function (s) {
  return new Vector(this.x / s, this.y / s);
}

Vector.prototype.magnitude = function () {
  return Math.sqrt((this.x * this.x) + (this.y * this.y));
}

Vector.prototype.unit = function () {
  return this.divide(this.magnitude());
}

Vector.prototype.angle = function () {
  return Math.atan2(this.y, this.x);
}
