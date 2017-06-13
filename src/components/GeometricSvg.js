import React from 'react';
import PropTypes from 'prop-types';
import PathSvg from './PathSvg';
import Hexagon from '../utils/hexagon';
import Pentagon from '../utils/pentagon';
import Octagon from '../utils/octagon';
import Decagon from '../utils/decagon';

/**
 * GeometricSvg
 * @author terencewu
 */
export default class GeometricSvg extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['pentagon', 'hexagon', 'octagon', 'decagon']),
    orientation: PropTypes.oneOf(['pointy', 'flat']),
    startPoint: PropTypes.number,
    length: PropTypes.number,
    borderRadius: PropTypes.number,
    strokeWidth: PropTypes.number,
    strokeColor: PropTypes.string,
    fillColor: PropTypes.string,
    shadow: PropTypes.string,
    defaultOffset: PropTypes.number
  };

  static defaultProps = {
    type: 'hexagon',
    orientation: 'pointy',
    length: 100,
    borderRadius: 0,
    strokeWidth: 0,
    strokeColor: '#000',
    fillColor: '#fff',
    shadow: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      strokeDashoffset: this.props.defaultOffset || 0
    };
    this.updateShape(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateShape(nextProps);
  }

  updateShape(props) {
    const { type, orientation, length, borderRadius, startPoint } = props;
    if (!type) {
      return;
    }
    if (type === 'hexagon') {
      this.shape = new Hexagon();
    } else if (type === 'pentagon') {
      this.shape = new Pentagon();
    } else if (type === 'octagon') {
      this.shape = new Octagon();
    } else if (type === 'decagon') {
      this.shape = new Decagon();
    }
    if (length) {
      this.shape.setLength(length);
    }
    if (borderRadius) {
      this.shape.setRadius(borderRadius);
    }
    if (startPoint) {
      this.shape.setStartPoint(startPoint);
    }
    if (orientation) {
      this.shape.setOrientation(orientation);
    }
  }

  changeOffset(offset) {
    if (offset === undefined) {
      return;
    }
    this.setState({
      strokeDashoffset: offset
    });
  }

  getTotalLength() {
    return this.shape.length * this.shape.sides;
  }

  render() {
    const { strokeColor, strokeWidth, fillColor, shadow } = this.props;
    const shape = this.shape;
    const shadowStyle = shadow ? `drop-shadow(${shadow})` : undefined;
    return (
      <PathSvg
        width={Math.ceil(shape.width)}
        height={Math.ceil(shape.height)}
        style={shadowStyle ? { filter: shadowStyle, WebkitFilter: shadowStyle } : null}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        fillColor={fillColor}
        strokeDasharray={this.getTotalLength()}
        strokeDashoffset={this.state.strokeDashoffset}
        strokeMiterlimit={10}
        data={shape.getPath().toString()} />
    );
  }
}
