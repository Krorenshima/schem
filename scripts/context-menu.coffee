( (window, document) ->
  color = require './color'
  test = require './test'
  {body, head} = document

  contextmenu =
    commands: {}

    menu: pen('<div class="contextmenu">').attr('align', 'center')

    add: (name, evhr, commandType = "button", el) ->
      self = contextmenu
      hr = pen('<hr class="contextmenu-divider">')
      prefix = "contextmenu-command"
      el = "<#{el} class='#{prefix} custom'>"
      if commandType.match(/link/gi)
        temp = pen("<a href='#{evhr}' class='#{prefix} link'>").html(name)
      else if commandType.match(/button/gi)
        temp = pen("<span class='#{prefix}'>").on('click', evhr).html(name)
      else if commandType.match(/custom/gi)
        temp = if type(evhr) is 'function' then pen(el).on('click', evhr).html(name) else pen(el).href(evhr).html(name)
      self.commands[name] = {}
      self.commands[name].el = temp
      self.commands[name].hr = hr
      self.menu.append self.commands[name].el, self.commands[name].hr
      return self

    removeCommand: (name, fully = false) ->
      self = contextmenu
      self.commands[name].el.remove()
      self.commands[name].hr.remove()
      if fully is true then delete self.commands[name] else undefined
      return self

    remove: () ->
      self = contextmenu
      for name of self.commands
        self.removeCommand(name)
      return self

    init: (e) ->
      self = contextmenu
      self.menu.css
        top: "#{e.clientY}px"
        left: "#{e.clientX}px"

      for name of self.commands
        self.menu.append self.commands[name].el.element, self.commands[name].hr.element

      window.addEventListener 'click', self.remove, once: true
      pen(body).append(self.menu)
      return self
  module.exports = contextmenu
  return
)(window, document)
