# react-svg-creator

## Features

- React components to create svg shape(Regular polygon).
- Custom style supported。

## Installation

```bash
npm install react-svg-creator --save
```
    
## Usage

```js
import { GeometricSvg } from 'react-svg-creator';

ReactDOM.render(
  <GeometricSvg
    type="hexagon"
    length={100}
    strokeColor="#000"
    strokeWidth={2}
    fillColor="#fff"
    borderRadius={10} />, container);
```

## API

Prop | Type | Description | Default
:----|:----:|:------|:-----:
| type | string | 'pentagon', 'hexagon', 'octagon', 'decagon' | `'hexagon'` |
| startPoint | number | start point of shape path  | `0` |
| length | number | length of shape | `100` |
| borderRadius | number | border radius of round corner | `0` |
| strokeWidth | number | stoke width of shape border | `0` |
| strokeColor | string | outline color of shape | `'#000'` |
| fillColor | string | fill color of shape | `'#fff'` |
| defaultOffset | number | default offset of shape path ||