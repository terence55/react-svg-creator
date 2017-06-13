import React from 'react';
import PropTypes from 'prop-types';

/**
 * PathSvg
 * @author terencewu
 */
export default class PathSvg extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    strokeWidth: PropTypes.number,
    strokeColor: PropTypes.string,
    strokeDasharray: PropTypes.number,
    strokeDashoffset: PropTypes.number,
    strokeLinecap: PropTypes.string,
    strokeLinejoin: PropTypes.string,
    strokeOpacity: PropTypes.number,
    strokeMiterlimit: PropTypes.number,
    fillColor: PropTypes.string,
    shadow: PropTypes.string,
    data: PropTypes.string
  };

  static defaultProps = {
    width: 20,
    height: 20,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeMiterlimit: 4,
    strokeOpacity: 1
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { style, width, height, data, strokeWidth, strokeColor, fillColor, strokeDasharray, strokeDashoffset, strokeMiterlimit, strokeLinecap, strokeLinejoin, strokeOpacity } = this.props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={Math.ceil(width)}
        height={Math.ceil(height)}
        viewBox={`0 0 ${width} ${height}`}
        style={style}>
        <path
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill={fillColor}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeMiterlimit={strokeMiterlimit}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          strokeOpacity={strokeOpacity}
          d={data} />
      </svg>
    );
  }
}
