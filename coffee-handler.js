var type = (function() {
  classToType = {};
  ref = "Boolean Number String Function Array Date RegExp Undefined Null Error Symbol".split(/\s+/);
  for (let  i = 0; i < ref.length; i++) {
    let name = ref[i];
    classToType[`[object ${name}]`] = name.toLowerCase();
  }
  return function(obj) {
    var strType = Object.prototype.toString.call(obj);
    return classToType[strType] || "object";
  };})();
var fs = require('fs');
var coffee_eval = (...code) => {
  if (type(code) === 'array') code = code.join('\n\n');
  bare = (code) => {
    try {
      code = require('coffeescript').compile(code, {bare:true})
      return code
    } catch (err) {
      console.error(err)
    }};
  try {
    code = eval(code)
    return code
  } catch (err) {
    console.error(err)
  }
};
var coffees;

check = function() {
  coffees = document.querySelectorAll("coffee-script, script[type='text/coffeescript']");
  if (coffees.length >= 0) {
    for (var index = 0; index < coffees.length; index++) {
      console.log(`script index: ${index}`)
      var script = coffees[index];
      if (script.innerHTML.length === 0) {
        if (script.getAttribute("src")) {
          codesrc = coffee_eval(fs.readFileSync(script.getAttribute("src"), "utf8"));
        }
      } else {
        code = coffee_eval(script.innerHTML);
      }
    }
  }
};

window.onload = check;
