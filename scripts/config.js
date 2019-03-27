const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const builtins = require('rollup-plugin-node-builtins');
const version = process.env.VERSION || require('../package.json').version;

const paths = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  outputFolder: path.join(__dirname, '../dist'),
}

const common = {
  name: 'mp',
  input: path.join(paths.src, 'index.js'),
  uglifyOptions: {
    toplevel: true,
    compress: true,
    mangle: true
  },
  banner:
    `/**
  * Knawat MP ${version}
  * (c) ${new Date().getFullYear()}
    * @license MIT
    */`,
  plugins: [
    babel(),
    commonjs(),
    nodeResolve(),
    builtins()
  ]
}
const builds = {
  umd: {
    format: 'umd',
    name: 'MP',
    minify: true,
    ext: ''
  },
  esm: {
    format: 'es',
    ext: '.esm'
  }
}

function getConfig (key) {
  const build = builds[key];
  const config = {
    ...build,
    input: {
      input: build.input || common.input,
      plugins: build.plugins || common.plugins,
      external: ['node-fetch', 'querystring']
    },
    output: {
      name: build.name || common.name,
      banner: common.banner,
      format: build.format,
      globals: {
        'node-fetch': 'fetch',
        'querystring': 'querystring'
      },
      exports: 'named'
    }
  }
  return config;
}

const configs = Object.keys(builds).reduce((acc, build) => {
  acc[build] = getConfig(build);
  return acc;
}, {})

module.exports = {
  paths,
  configs,
  common
};