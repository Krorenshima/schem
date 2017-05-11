var header = {
  buttons: {},
  head: pen("div").class("header").el,
  title: pen("span").class("title").html(document.title).el,

  addButton: function(view, event) {
    header.buttons[view] = pen("span").css("-webkit-app-region", "no-drag").class("header-button Ril").html(view).on("click", event).el
    return header
  },

  removeButton: function(name) {
    pen(header.buttons[name]).remove()
    return header
  },

  init: function() {
    pen(header.head).append(header.title)
    for (var name in header.buttons) {
      pen(header.head).append(header.buttons[name])
    }
    pen(document.body).append(header.head)
    return header
  }
}

module.exports = header
