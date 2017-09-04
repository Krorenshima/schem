var slice;;
var argvs, attrs, charact, characterizer, check, childp, dir, downloader, env, error, file, fs, fsext, fsextra, log, parse, path, setup, stringify, type;

fs = require('fs');

path = require('path');

type = require('type');

({error, dir} = console);

argvs = require('process-args');

childp = require('child_process');

fsextra = fsext = require('fsext');

env = require('env');

file = require('file');

downloader = require('downloader');

charact = characterizer = require('characterizer');

attrs = require('attrs');

slice = (arr) => Array.prototype.slice.call(arr);

log = function() {
  var args, nargs;
  args = arguments;
  nargs = slice(args);
  nargs.forEach((arg) => {
    process.stdout.write(`${arg}\n`);
    console.log(`${arg}`);
  });
};

check = (str) => {
  str = str.replace(/\\/gi, '/');
  if (fs.existsSync(str) === false) {
    throw new Error(`Path ${str} doesn't exist`);
  }
  return str;
};

setup = (file, start, ops) => {
  var dotfilereg, f, fname, normreg, opz, ozg;
  fname = path.join(start, file).replace(/\\/g, '/');
  opz = {
    ignore: ((ops != null) && (ops.ignore != null) ? ops.ignore : null),
    filter: ((ops != null) && (ops.filter != null) ? ops.filter : null),
    cb: ((ops != null) && (ops.cb != null) ? ops.cb : null)
  };
  normreg = /([^\n\.\\]+)\.([^\n]+)$/m;
  dotfilereg = /(\.[^\n\\]+)$/m;
  if (normreg.test(file) === true) {
    f = normreg.exec(file);
    if (f == null) {
      f = file;
    } else {
      f = f.slice(1, 3);
    }
  } else if (dotfilereg.test(file) === true) {
    f = dotfilereg.exec(file);
    if (f == null) {
      f = file;
    } else {
      f = f[1];
    }
  }
  ozg = {
    ops: opz,
    path: fname.split('/'),
    file: f,
    whole: fname
  };
  return ozg;
};

({parse, stringify} = JSON);

module.exports = {fs, path, type, log, error, dir, check, setup, slice, parse, stringify, argvs, childp, fsext, fsextra, fsext, env, file, downloader, charact, characterizer, attrs};
