var header = {
  buttons: {},
  head: pen("div").class("header").el,
  title: pen("span").class("title").html(document.title).el,

  add: function (name, evhr, type, el) {
    var self = header
    var temp
    var prefix = "header-button"
    if (type.match(/link/gi)) {
      temp = pen("a").href(evhr).html(name).class(`${prefix} Ril link`).el
    } else if (type.match(/button/gi)) {
      temp = pen("span").on("click", evhr).html(name).class(`${prefix} Ril`).el
    } else if (type.match(/custom/gi)) {
      type(evhr) === 'function' ? temp = pen(el).on("click", evhr).html(name).class(`${prefix} Ril custom`).el
      : temp = pen(el).href(evhr).html(name).class(`${prefix} Ril custom`).el
    }
    self.buttons[name] = temp
    return self
  },

  removeButton: function(name, fully = false) {
    var self = header
    pen(self.buttons[name].el).remove()
    fully === true ? delete self.buttons[name] : void 0
    return self
  },

  init: function() {
    var self = header, brs = []
    pen(header.head).append(header.title)
    for (var name in header.buttons) {
      pen(header.head).append(header.buttons[name])
    }
    for (var i = 0; i <= 3; i++) {
      brs[i] = pen("br").el
      document.body.insertBefore(brs[i], document.body.childNodes[0])
    }
    pen(document.body).el.insertBefore(header.head, document.body.childNodes[0])
    return self
  }
}

module.exports = header
