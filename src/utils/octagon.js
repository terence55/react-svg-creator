import Vector from './vector';
import Path from './path';
import Geometric from './geometric';

export default class Octagon extends Geometric {
  constructor() {
    super();
    this.sides = 8;
  }

  getPath() {
    const height = this.height;
    const width = this.width;
    let a;
    let b;
    let c;
    let d;
    let e;
    let f;
    let g;
    let h;

    if (this.orientation === Geometric.POINTY_TOP) {
      a = new Vector(width / 2, 0);
      b = new Vector(0.8535 * width, 0.1464 * height);
      c = new Vector(width, height / 2);
      d = new Vector(0.8535 * width, 0.8535 * height);
      e = new Vector(width / 2, height);
      f = new Vector(0.1464 * width, 0.8535 * height);
      g = new Vector(0, height / 2);
      h = new Vector(0.1464 * width, 0.1464 * height);
    } else {
      a = new Vector(0.3 * width, 0);
      b = new Vector(0.7 * width, 0);
      c = new Vector(width, 0.3 * height);
      d = new Vector(width, 0.7 * height);
      e = new Vector(0.7 * width, height);
      f = new Vector(0.3 * width, height);
      g = new Vector(0, 0.7 * height);
      h = new Vector(0, 0.3 * height);
    }

    if (this.radius === 0) {
      const sequence = [a, b, c, d, e, f, g, h];
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
    const f2e = Vector.fromAngle(f.subtract(e).angle(), this.radius);
    const g2f = Vector.fromAngle(g.subtract(f).angle(), this.radius);
    const h2g = Vector.fromAngle(h.subtract(g).angle(), this.radius);
    const a2h = Vector.fromAngle(a.subtract(h).angle(), this.radius);

    const sequence = [
      {
        src: a.subtract(a2h),
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
          to: e.add(f2e)
        }
      },
      {
        src: f.subtract(f2e),
        dst: {
          control: f,
          to: f.add(g2f)
        }
      },
      {
        src: g.subtract(g2f),
        dst: {
          control: g,
          to: g.add(h2g)
        }
      },
      {
        src: h.subtract(h2g),
        dst: {
          control: h,
          to: h.add(a2h)
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
    if (this.orientation === Geometric.POINTY_TOP) {
      this.width = this.length * 2.6132;
      this.height = this.width;
    } else {
      this.width = this.length * 2.4142;
      this.height = this.width;
    }
  }
}
