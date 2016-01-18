import npm from 'rollup-plugin-npm';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';
// import pkg from './package.json';
//
// var copyright = '/* ' + pkg.name + ' - v' + pkg.version + ' - ' + new Date().toString() + '\n' +
//                 ' * Copyright (c) ' + new Date().getFullYear() + ' Environmental Systems Research Institute, Inc.\n' +
//                 ' * ' + pkg.license + ' */';

export default {
  entry: 'src/EsriLeaflet.js',
  dest: 'dist/esri-leaflet.js',
  moduleName: 'L.esri',
  sourceMap: 'dist/esri-leaflet.js.map',
  // intro: copyright,
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