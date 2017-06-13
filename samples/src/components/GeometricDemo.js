import React from 'react';
// import GeometricSvg from '../../../src/components/GeometricSvg';
import { GeometricSvg } from '../../../dist/lib';

export default class GeometricDemo extends React.Component {

  constructor(props) {
    super(props);
    this.length = 100;
    this.state = {
      radius: 0,
      strokeWidth: 1,
      strokeColor: 'red',
      fillColor: '#fff'
    };
  }

  componentWillUnmount() {
    this.stopPathAnim();
  }

  render() {
    const shape = ['pentagon', 'hexagon', 'octagon', 'decagon'];
    const shapeStyle = {
      display: 'inline-block',
      margin: 10
    };
    return (
      <div style={{ background: '#444', padding: 20 }}>
        <div>
          <input type="text" placeholder="borderRadius" value={this.state.radius} onChange={event => this.setState({ radius: event.target.value.replace(/[^0-9]/g, '') })} />
        </div>
        <div>
          <input type="text" placeholder="strokeWidth" value={this.state.strokeWidth} onChange={event => this.setState({ strokeWidth: event.target.value.replace(/[^0-9]/g, '') })} />
        </div>
        <div>
          <input type="text" placeholder="strokeColor" value={this.state.strokeColor} onChange={event => this.setState({ strokeColor: event.target.value })} />
        </div>
        <div>
          <input type="text" placeholder="fillColor" value={this.state.fillColor} onChange={event => this.setState({ fillColor: event.target.value })} />
        </div>
        <div>
          <input type="checkbox" onChange={event => (event.target.checked ? this.startPathAnim() : this.stopPathAnim())} />
        </div>
        {
          shape.map(item =>
            <div key={item}>
              <div style={shapeStyle}>
                <GeometricSvg
                  ref={`${item}`}
                  type={item}
                  length={this.length}
                  strokeColor={this.state.strokeColor}
                  strokeWidth={this.state.strokeWidth}
                  fillColor={this.state.fillColor}
                  borderRadius={this.state.radius}
                  startPoint={0} />
              </div>
              <div style={shapeStyle}>
                <GeometricSvg
                  ref={`${item}_flat`}
                  type={item}
                  length={this.length}
                  strokeColor={this.state.strokeColor}
                  strokeWidth={this.state.strokeWidth}
                  fillColor={this.state.fillColor}
                  borderRadius={this.state.radius}
                  startPoint={0}
                  orientation="flat" />
              </div>
            </div>
          )
        }
      </div>
    );
  }

  startPathAnim() {
    const shape = ['pentagon', 'hexagon', 'octagon', 'decagon'];
    this.anims = [];
    this.off = {};
    shape.forEach((item) => {
      const comp1 = this.refs[`${item}`];
      const comp2 = this.refs[`${item}_flat`];
      this.off[`${item}`] = comp1.getTotalLength();
      const id = setInterval(() => {
        comp1.changeOffset(this.off[`${item}`]);
        comp2.changeOffset(this.off[`${item}`]);
        this.off[`${item}`] -= 20;
        if (this.off[`${item}`] < 0) {
          this.off[`${item}`] = comp1.getTotalLength();
        }
      }, 100);
      this.anims.push(id);
    });
  }

  stopPathAnim() {
    if (!this.anims || this.anims.length === 0) {
      return;
    }
    this.anims.forEach(item => clearInterval(item));
    const shape = ['pentagon', 'hexagon', 'octagon', 'decagon'];
    shape.forEach((item) => {
      const comp1 = this.refs[`${item}`];
      const comp2 = this.refs[`${item}_flat`];
      comp1.changeOffset(0);
      comp2.changeOffset(0);
    });
  }
}
