var check, dir, error, fs, log, path, setup, type;

({fs, path, type, log, error, dir, check, setup} = require('tools'));

module.exports = function(start, ops) {
  var cb, files, filter, ignore, ret;
  start = check(start);
  files = fs.readdirSync(start);
  files = files.filter((file) => {
    var stat;
    stat = fs.lstatSync(`${start}/${file}`);
    if (stat.isFile() === true) {
      return file;
    }
  });
  ret = [];
  if (files.length !== 0) {
    filter = null;
    ignore = null;
    cb = null;
    files.forEach((file) => {
      var whole;
      ({ops, file, whole} = setup(file, start, ops));
      ({filter, ignore, cb} = ops);
      return ret.push({file, whole});
    });
    if (filter != null) {
      if (type(filter) === 'regexp') {
        ret = ret.filter((file) => {
          return filter.test(file.whole) === true;
        });
      } else {
        ret = ret.filter(filter);
      }
    }
    if (ignore != null) {
      if (type(ignore) === 'regexp') {
        ret = ret.filter((file) => {
          return ignore.test(file.whole) === false;
        });
      } else {
        ret = ret.filter(ignore);
      }
    }
    if (cb != null) {
      return cb(ret, start, fname);
    } else {
      return ret;
    }
  }
};
