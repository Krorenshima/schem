var base;

base = function(attr) {
  var type;
  type = require('type');
  return (el, val) => {
    if (type(el) === 'array') {
      el.forEach((info) => {
        var element, value;
        [element, value] = info.slice(0, 2);
        return element.setAttribute(attr, value);
      });
    } else {
      el.setAttribute(attr, val);
    }
  };
};

module.exports = {
  Class: base('class'),
  Id: base('id'),
  Type: base('type'),
  Value: base('value'),
  preHold: base('placeholder'),
  append: function(el, ...vals) {
    vals.forEach((val) => {
      return el.appendChild(val);
    });
  }
};
