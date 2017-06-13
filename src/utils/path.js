export default function Path(commands) {
  this.commands = commands;
}

Path.prototype.toString = function () {
  return this.commands.join('');
};

Path.M = function (point) {
  this.point = point;
};

Path.M.prototype.toString = function () {
  return 'M' + this.point.x + ' ' + this.point.y;
};

Path.L = function (to) {
  this.to = to;
};

Path.L.prototype.toString = function () {
  return 'L' + this.to.x + ' ' + this.to.y;
};

Path.Q = function (control, to) {
  this.control = control;
  this.to = to;
};

Path.Q.prototype.toString = function () {
  return 'Q' + this.control.x + ' ' + this.control.y
    + ' ' + this.to.x + ' ' + this.to.y;
};

Path.Z = function () { };

Path.Z.prototype.toString = function () {
  return 'Z';
};
