import React from 'react';
import GeometricDemo from './GeometricDemo';

const config = [
  {
    type: 'geometric',
    link: '/component/geometric',
    comp: <GeometricDemo />
  }
];

const pageMap = {};
config.forEach(item => (pageMap[item.type] = item.comp));

export default {
  config: config,
  pageMap: pageMap
};
