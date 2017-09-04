var file;

file = (function() {
  var dir, error, fs, log, type;
  ({log, error, dir} = console);
  fs = require('fs');
  type = require('type');
  file = function(f, enc = 'utf8', syncAc = true) {
    var it;
    if (!(this instanceof file)) {
      return new file(...arguments);
    }
    it = this;
    this.fname = f;
    this.file = (() => {
      if (fs.existsSync(f)) {
        if (fs.lstatSync(f).isFile() === true) {
          f = fs.readFileSync(f, enc);
        } else {
          throw new Error(`${f} isn't a file`);
        }
      }
      return f;
    })();
    this.synchronusActions = syncAc;
    return this.encoding = enc;
  };
  file.data = file.prototype = {};
  file.prototype.change = function(key, val) {
    this[key] = val;
    return this;
  };
  file.prototype.exists = file.prototype.checkExistance = () => {
    return fs.existsSync(this.fname);
  };
  file.prototype.remove = function() {
    if (this.exists() === true) {
      fs.unlinkSync(this.fname);
    } else {
      log("Tried to remove a non-existant file");
    }
    return this;
  };
  file.prototype.write = function() {
    var args;
    args = arguments;
  };
  // file::write.file = {}

  // file::write.file.async = (data, append = true) ->
  file.prototype.read = function(sync) {};
  return file;
})();
