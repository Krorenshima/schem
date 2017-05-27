( (window) ->
  test = require './test'
  {body, head} = document

  header =
    buttons: {}
    head: pen('<div class="header">')
    title: pen('<span class="title Lil">').html(document.title)

    add: (name, evhr, buttonType = "button", el) ->
      self = header
      prefix = "header-button"
      el = "<#{el} class='#{prefix} custom Ril'>"
      if buttonType.match(/link/gi)
        temp = pen("<a class='#{prefix} link Ril' href='evhr'>").html(name)
      else if buttonType.match(/button/gi)
        temp = pen("<span class='#{prefix} Ril'>").on('click', evhr).html(name)
      else if buttonType.match(/custom/gi)
        temp = if type(evhr) is 'function' then pen(el).on('click', evhr).html(name) else pen(el).href(evhr).html(name)
      self.buttons[name] = temp
      return self

    removeButton: (name, fully) ->
      self = header
      pen(self.buttons[name]).remove()
      if fully is true then delete self.buttons[name] else undefined
      return self

    init: () ->
      self = header
      brs = []
      pen(self.head).append(self.title)
      for name of self.buttons
        pen(self.head).append(self.buttons[name])
      pen(body).append(self.head)

      for i in [0..3]
        brs[i] = pen('<br>').el
        body.insertBefore(brs[i], body.childNodes[0])

      return self
  module.exports = header
  return
)(window)
