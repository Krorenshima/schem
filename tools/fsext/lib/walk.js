var check, dir, error, fs, log, path, setup, type, walk;

({fs, path, type, log, error, dir, check, setup} = require('tools'));

walk = function(start, ret4) {
  var file, files, fname, i, len, stat;
  start = check(start, start);
  ret4 = ret4 || [];
  files = fs.readdirSync(start);
  for (i = 0, len = files.length; i < len; i++) {
    file = files[i];
    ({fname} = setup(file, start));
    stat = fs.lstatSync(fname);
    ret4.push(fname);
    if (stat.isDirectory() === true) {
      walk(fname, ret4);
    }
  }
  return ret4;
};

module.exports = walk;
