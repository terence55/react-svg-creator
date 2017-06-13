import Vector from './vector';
import Path from './path';
import Geometric from './geometric';

export default class Decagon extends Geometric {
  constructor() {
    super();
    this.sides = 10;
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
    let i;
    let j;

    if (this.orientation === Geometric.POINTY_TOP) {
      a = new Vector(width / 2, 0);
      b = new Vector(0.809 * width, 0.0955 * height);
      c = new Vector(width, 0.3455 * height);
      d = new Vector(width, 0.6545 * height);
      e = new Vector(0.809 * width, 0.9045 * height);
      f = new Vector(width / 2, height);
      g = new Vector(0.191 * width, 0.9045 * height);
      h = new Vector(0, 0.6545 * height);
      i = new Vector(0, 0.3455 * height);
      j = new Vector(0.191 * width, 0.0955 * height);
    } else {
      a = new Vector(0.3455 * width, 0);
      b = new Vector(0.6545 * width, 0);
      c = new Vector(0.9045 * width, 0.191 * height);
      d = new Vector(width, height / 2);
      e = new Vector(0.9045 * width, 0.809 * height);
      f = new Vector(0.6545 * width, height);
      g = new Vector(0.3455 * width, height);
      h = new Vector(0.0955 * width, 0.809 * height);
      i = new Vector(0, height / 2);
      j = new Vector(0.0955 * width, 0.191 * height);
    }

    if (this.radius === 0) {
      const sequence = [a, b, c, d, e, f, g, h, i, j];
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
    const i2h = Vector.fromAngle(i.subtract(h).angle(), this.radius);
    const j2i = Vector.fromAngle(j.subtract(i).angle(), this.radius);
    const a2j = Vector.fromAngle(a.subtract(j).angle(), this.radius);

    const sequence = [
      {
        src: a.subtract(a2j),
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
          to: h.add(i2h)
        }
      },
      {
        src: i.subtract(i2h),
        dst: {
          control: i,
          to: i.add(j2i)
        }
      },
      {
        src: j.subtract(j2i),
        dst: {
          control: j,
          to: j.add(a2j)
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
      this.width = this.length * 3.0778;
      this.height = this.length * 3.236;
    } else {
      this.width = this.length * 3.236;
      this.height = this.length * 3.0778;
    }
  }
}
