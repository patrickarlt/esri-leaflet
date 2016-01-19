var pkg = require('./package.json');

import npm from 'rollup-plugin-npm';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';

var copyright = '/**\n' +
                ' * ' + pkg.name + ' - v' + pkg.version + ' - ' + new Date().toString() + '\n' +
                ' * Copyright (c) ' + new Date().getFullYear() + ' Environmental Systems Research Institute, Inc.\n' +
                ' * @license ' + pkg.license + '\n'+
                ' */';

export default {
  entry: 'src/EsriLeaflet.js',
  dest: 'dist/esri-leaflet.js',
  moduleName: 'L.esri',
  format: 'umd',
  banner: copyright,
  sourceMap: 'dist/esri-leaflet.js.map',
  external: [
    'leaflet'
  ],
  globals: {
    'leaflet': 'L'
  },
  plugins: [
    json(),
    npm({
      jsnext: true
    }),
    uglify()
  ]
}