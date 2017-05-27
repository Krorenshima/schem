var check, coffee_eval, fs;

fs = require('fs');

coffee_eval = (...code) => {
  var bare, err;
  if (type(code) === 'array') {
    code = code.join('\n\n');
  }
  bare = (code) => {
    var err;
    try {
      code = require('coffeescript').compile(code, {
        bare: true
      });
      return code;
    } catch (error) {
      err = error;
      return console.error(err);
    }
  };
  try {
    code = eval(code);
    return code;
  } catch (error) {
    err = error;
    return console.error(err);
  }
};

check = function() {
  var code, codesrc, coffees, i, index, len, results, script;
  coffees = document.querySelectorAll("coffee-script, script[type='text/coffeescript']");
  results = [];
  for (index = i = 0, len = coffees.length; i < len; index = ++i) {
    script = coffees[index];
    if (script != null) {
      if (script.textContent.length === 0) {
        if (script.getAttribute("src") != null) {
          results.push(codesrc = coffee_eval(fs.readFileSync(script.getAttribute("src"), "utf8")));
        } else {
          results.push(void 0);
        }
      } else {
        results.push(code = coffee_eval(script.textContent));
      }
    } else {
      results.push(void 0);
    }
  }
  return results;
};

window.onload = check;
