var color = require('./color')
var contextmenu = {
  commands: {},
  menu: pen("div").class("contextmenu").el,

  addCommand: function(cover, ev) {
    var self = contextmenu
    self.commands[cover] = {}
    self.commands[cover].el = pen("span").html(cover).class("contextmenu-command").on("click", ev).el,
    self.commands[cover].hr = pen("hr").class("contextmenu-divider").el
    return contextmenu
  },

  removeCommand: function(name) {
    var self = contextmenu
    pen(self.commands[name].el).remove()
    pen(self.commands[name].hr).remove()
    return contextmenu
  },

  remove: function() {
    var self = contextmenu
    for (var name in self.commands) {
      self.removeCommand(name)
    }
    pen(self.menu).remove()
    return contextmenu
  },

  init: function(e) {
    var self = contextmenu
    pen(self.menu).css({
      top: `${e.clientY}px`,
      left: `${e.clientX}px`,
      'background-color': color.rgbaOfWindow(1)})
    for (var name in self.commands) {
      pen(self.menu).append(self.commands[name].el, self.commands[name].hr)
    }
    pen(self.menu).appendTo(body)
    addEventListener("click", self.remove, {once: true})
    return contextmenu
  }
}

module.exports = contextmenu
