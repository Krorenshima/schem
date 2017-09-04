type = do ->
  class2Type = {}
  names = 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split /\s+/gi
  names.forEach (name) =>
    class2Type["[object #{name}]"] = name.toLowerCase()
  (obj) ->
    strType = Object.prototype.toString.call(obj)
    class2Type[strType] || 'object'

module.exports = type
