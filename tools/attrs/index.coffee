base = (attr) ->
  type = require 'type'
  (el, val) =>
    if type(el) is 'array'
      el.forEach (info) =>
        [element, value] = info[0..1]
        element.setAttribute attr, value
    else
      el.setAttribute attr, val
    return

module.exports =
  Class: base('class')
  Id: base('id')
  Type: base('type')
  Value: base('value')
  preHold: base('placeholder')

  append: (el, vals...) ->
    vals.forEach (val) =>
      el.appendChild val
    return
