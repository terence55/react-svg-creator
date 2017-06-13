import Vector from './vector';
import Path from './path';
import Geometric from './geometric';

export default class Hexagon extends Geometric {
  constructor() {
    super();
    this.sides = 6;
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

    if (this.orientation === Geometric.POINTY_TOP) {
      a = new Vector(width / 2, 0);
      b = new Vector(width, height / 4);
      c = new Vector(width, (height * 3) / 4);
      d = new Vector(width / 2, height);
      e = new Vector(0, (height * 3) / 4);
      f = new Vector(0, height / 4);
    } else {
      a = new Vector(0, height / 2);
      b = new Vector(width / 4, 0);
      c = new Vector((width * 3) / 4, 0);
      d = new Vector(width, height / 2);
      e = new Vector((width * 3) / 4, height);
      f = new Vector(width / 4, height);
    }

    if (this.radius === 0) {
      const sequence = [a, b, c, d, e, f];
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

    const addXAddY = Vector.fromAngle(b.subtract(a).angle(), this.radius);
    const minusXAddY = Vector.fromAngle(f.subtract(a).angle(), this.radius);
    const sameLevel = this.orientation === Geometric.POINTY_TOP ? new Vector(0, this.radius) : new Vector(this.radius, 0);
    const sequence = [
      {
        src: a.add(minusXAddY),
        dst: {
          control: a,
          to: a.add(addXAddY)
        }
      },
      {
        src: b.subtract(addXAddY),
        dst: {
          control: b,
          to: b.add(sameLevel)
        }
      },
      {
        src: c.subtract(sameLevel),
        dst: {
          control: c,
          to: c.add(minusXAddY)
        }
      },
      {
        src: d.subtract(minusXAddY),
        dst: {
          control: d,
          to: d.subtract(addXAddY)
        }
      },
      {
        src: e.add(addXAddY),
        dst: {
          control: e,
          to: e.subtract(sameLevel)
        }
      },
      {
        src: f.add(sameLevel),
        dst: {
          control: f,
          to: f.subtract(minusXAddY)
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
      this.height = this.length * 2;
      this.width = (this.height * Math.sqrt(3)) / 2;
    } else {
      this.width = this.length * 2;
      this.height = (this.width * Math.sqrt(3)) / 2;
    }
  }
}
