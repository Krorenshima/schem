var type;

type = (function() {
  var class2Type, names;
  class2Type = {};
  names = 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split(/\s+/gi);
  names.forEach((name) => {
    return class2Type[`[object ${name}]`] = name.toLowerCase();
  });
  return function(obj) {
    var strType;
    strType = Object.prototype.toString.call(obj);
    return class2Type[strType] || 'object';
  };
})();

module.exports = type;
