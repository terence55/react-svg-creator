import Path from './path';

export default class Geometric {
  static DEFAULT_LENGTH = 100;
  static DEFAULT_RADIUS = 0;
  static DEFAULT_START_POINT = 0;

  static POINTY_TOP = 'pointy';
  static FLAT_TOP = 'flat';

  constructor() {
    this.orientation = Geometric.POINTY_TOP;
    this.length = Geometric.DEFAULT_LENGTH;
    this.radius = Geometric.DEFAULT_RADIUS;
    this.startPoint = Geometric.DEFAULT_START_POINT;
    this.sides = 0;
    this.update();
  }

  setOrientation(orientation) {
    this.orientation = orientation;
    this.update();
  }

  setLength(length) {
    this.length = Math.max(0, length);
    this.update();
  }

  setRadius(radius) {
    this.radius = Math.max(0, Math.min(this.length / 2, radius));
    this.update();
  }

  setStartPoint(point) {
    this.startPoint = point;
    if (this.startPoint < 0 || this.startPoint > this.sides - 1) {
      this.startPoint = 0;
    }
    this.update();
  }

  getPath() {
    return new Path([]);
  }

  update() {
  }
}
