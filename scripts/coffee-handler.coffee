fs = require 'fs'
coffee_eval = (code...) =>
  if type(code) is 'array' then code = code.join('\n\n')
  bare = (code) =>
    try
      code = require('coffeescript').compile(code, bare:true)
      return code
    catch err
      console.error(err)
  try
    code = eval(code)
    return code
  catch err
    console.error(err)

check = ->
  coffees = document.querySelectorAll("coffee-script, script[type='text/coffeescript']")
  for script, index in coffees
    if script?
      if script.textContent.length is 0
        if script.getAttribute("src")?
          codesrc = coffee_eval(fs.readFileSync(script.getAttribute("src"), "utf8"))
      else
        code = coffee_eval(script.textContent)

window.onload = check
