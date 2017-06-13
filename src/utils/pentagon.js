import Vector from './vector';
import Path from './path';
import Geometric from './geometric';

export default class Pentagon extends Geometric {
  constructor() {
    super();
    this.sides = 5;
  }

  getPath() {
    const height = this.height;
    const width = this.width;
    let a;
    let b;
    let c;
    let d;
    let e;

    if (this.orientation === Geometric.POINTY_TOP) {
      a = new Vector(width / 2, 0);
      b = new Vector(width, 0.3831 * height);
      c = new Vector(0.8125 * width, height);
      d = new Vector(0.1875 * width, height);
      e = new Vector(0, 0.3831 * height);
    } else {
      a = new Vector(0.1875 * width, 0);
      b = new Vector(0.8125 * width, 0);
      c = new Vector(width, 0.6169 * height);
      d = new Vector(width / 2, height);
      e = new Vector(0, 0.6169 * height);
    }

    if (this.radius === 0) {
      const sequence = [a, b, c, d, e];
      let paths;
      if (this.startPoint === 0) {
        paths = sequence;
      } else {
        paths = sequence.slice(this.startPoint, sequence.length).concat(sequence.slice(0, this.startPoint));
      }
      const commands = [];
      paths.forEach((item, index) => {
        if (index === 0) {
          commands.push(new Path.M(item));
        } else {
          commands.push(new Path.L(item));
        }
      });
      commands.push(new Path.Z());
      return new Path(commands);
    }

    const b2a = Vector.fromAngle(b.subtract(a).angle(), this.radius);
    const c2b = Vector.fromAngle(c.subtract(b).angle(), this.radius);
    const d2c = Vector.fromAngle(d.subtract(c).angle(), this.radius);
    const e2d = Vector.fromAngle(e.subtract(d).angle(), this.radius);
    const a2e = Vector.fromAngle(a.subtract(e).angle(), this.radius);
    const sequence = [
      {
        src: a.subtract(a2e),
        dst: {
          control: a,
          to: a.add(b2a)
        }
      },
      {
        src: b.subtract(b2a),
        dst: {
          control: b,
          to: b.add(c2b)
        }
      },
      {
        src: c.subtract(c2b),
        dst: {
          control: c,
          to: c.add(d2c)
        }
      },
      {
        src: d.subtract(d2c),
        dst: {
          control: d,
          to: d.add(e2d)
        }
      },
      {
        src: e.subtract(e2d),
        dst: {
          control: e,
          to: e.add(a2e)
        }
      }
    ];
    let paths;
    if (this.startPoint === 0) {
      paths = sequence;
    } else {
      paths = sequence.slice(this.startPoint, sequence.length).concat(sequence.slice(0, this.startPoint));
    }
    const commands = [];
    paths.forEach((item, index) => {
      if (index === 0) {
        commands.push(new Path.M(item.src));
      } else {
        commands.push(new Path.L(item.src));
      }
      commands.push(new Path.Q(item.dst.control, item.dst.to));
    });
    commands.push(new Path.Z());
    return new Path(commands);
  }

  update() {
    this.width = this.length * 1.6;
    this.height = this.length * 1.54;
  }
}
