var check, dir, error, fromdir, fs, log, path, setup, type;

({fs, path, type, log, error, dir, check, setup} = require('tools'));

fromdir = function(start, ops, ret2) {
  var cb, dirs, file, files, filter, i, ignore, len, whole;
  start = check(start);
  ret2 = ret2 || [];
  files = fs.readdirSync(start);
  dirs = files.filter((fle) => {
    var stat;
    stat = fs.lstatSync(`${start}/${fle}`);
    if (stat.isDirectory() === true) {
      return fle;
    }
  }).map((fle) => {
    return `${start}/${fle}`;
  });
  files = files.filter((fle) => {
    var stat;
    stat = fs.lstatSync(`${start}/${fle}`);
    if (stat.isFile() === true) {
      return fle;
    }
  });
  if (dirs.length !== 0) {
    dirs.forEach((dir) => {
      return fromdir(dir, ops, ret2);
    });
  }
  if (files.length !== 0) {
    filter = null;
    ignore = null;
    cb = null;
    for (i = 0, len = files.length; i < len; i++) {
      file = files[i];
      ({ops, file, whole} = setup(file, start, ops));
      ({filter, ignore, cb} = ops);
      ret2.push({file, whole});
    }
    if (filter != null) {
      if (type(filter) === 'regexp') {
        ret2 = ret2.filter((file) => {
          return filter.test(file.whole) === true;
        });
      } else {
        ret2 = ret2.filter(filter);
      }
    }
    if (ignore != null) {
      if (type(ignore) === 'regexp') {
        ret2 = ret2.filter((file) => {
          return ignore.test(file.whole) === false;
        });
      } else {
        ret2 = ret2.filter(ignore);
      }
    }
    if (cb != null) {
      return cb(ret2, start, fname);
    } else {
      return ret2;
    }
  }
};

module.exports = fromdir;
