var char, characterizer;

char = (function() {
  var dir, error, fs, log, parse, stringify, type;
  ({log, error, dir, fs, parse, stringify, type} = require('tools'));
  char = function(ch, age, sex, fileLoc) {
    var prop;
    if (type(ch === 'string' && ch.contains('{'))) {
      parse(ch);
    }
    if (!(this instanceof char)) {
      return new char(...arguments);
    }
    if (ch instanceof char) {
      for (prop in ch) {
        this[prop] = ch[prop];
      }
    } else {
      this.name = ch;
      this.age = age;
      this.sex = sex;
      this.individualFileLoc = fileLoc;
      this.autoSave = true;
    }
    this.globalName = this.name.length >= 6 ? this.name.substring(0, 4) : this.name.substring(0, 3);
    global[this.name] = global[this.globalName] = this;
  };
  char.info = char.prototype = {};
  char.prototype.save = function() {
    fs.writeFileSync(this.individualFileLoc, stringify(this, null, 2), "utf8");
    return this;
  };
  char.prototype.retrieve = function(key) {
    return this[key];
  };
  char.prototype.set = function(key, value) {
    this[key] = value;
    this.save();
    return this;
  };
  char.prototype.remove = function(key, value, overWrite = false) {
    if (this[key] == null) {
      this[key] = value;
    } else {
      if (overWrite === true) {
        this[key] = value;
      } else {
        log(`Use ${this.name}.set instead`);
      }
    }
    this.save();
    return this;
  };
  return char;
})();

characterizer = {
  parse: function(filedir) {
    filedir = filedir.replace(/\\/gi, '/');
    return char(fs.readFileSync(filedir, "utf8"));
  },
  newChar: function(name, age, sex, fileLoc) {
    var ref;
    ref = char(name, age, sex, fileLoc);
    return ref.save();
  }
};

module.exports = characterizer;
