#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var rollup = require('rollup').rollup;
var UglifyJS = require('uglify-js');
var pkg = require('../package.json');
var entryFile = 'src/EsriLeaflet.js';
var json = require('rollup-plugin-json');
var npm = require('rollup-plugin-npm');

var copyright = '/**\n' +
                ' * ' + pkg.name + ' - v' + pkg.version + ' - ' + new Date().toString() + '\n' +
                ' * Copyright (c) ' + new Date().getFullYear() + ' Environmental Systems Research Institute, Inc.\n' +
                ' * @license ' + pkg.license + '\n'+
                ' */';

rollup({
  entry: path.resolve(entryFile),
  external: ['leaflet'],
  plugins: [
    json(),
    npm({
      jsnext: true
    })
  ]
}).then(function (bundle) {
  var transpiled = bundle.generate({
    format: 'umd',
    sourceMap: true,
    sourceMapFile: pkg.name + '.js.map',
    moduleName: 'L.esri',
    banner: copyright,
    globals: {
      'leaflet': 'L'
    }
  });

  var sourceMap = UglifyJS.SourceMap({
    file: pkg.name + '.js',
    root: process.cwd(),
    orig: JSON.parse(transpiled.map)
  });

  var stream = UglifyJS.OutputStream({
    comments: /@license/g,
    source_map: sourceMap
  });

  UglifyJS.parse(transpiled.code).print(stream);

  var code = stream.toString();
  var map = sourceMap.toString().replace(new RegExp(path.join(process.cwd(), 'src'), 'g'), '../src');

  fs.writeFileSync(path.join('dist', pkg.name + '.js'), code + '\n//# sourceMappingURL=./' + pkg.name + '.js.map');
  fs.writeFileSync(path.join('dist', pkg.name + '.js.map'), map);
  process.exit(0);
}).catch(function (error) {
  console.log(error);
  process.exit(1);
});
