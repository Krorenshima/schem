var color = require('./color')

 var ContextMenu = {
   commands: {},
   menu: pen("div").class("contextmenu").el,

   add: function (name, evhr, type, el) {
     var self = ContextMenu
     var temp, hr = pen("hr").class("contextmenu-divider").el
     var prefix = "contextmenu-command"
     if (type.match(/link/gi)) {
       temp = pen("a").href(evhr).html(name).class(`${prefix} link`).el
     } else if (type.match(/button/gi)) {
       temp = pen("span").on("click", evhr).html(name).class(`${prefix}`).el
     } else if (type.match(/custom/gi)) {
       type(evhr) === 'function' ? temp = pen(el).on("click", evhr).html(name).class(`${prefix} custom`).el
       : temp = pen(el).href(evhr).html(name).class(`${prefix} custom`).el
     }
     self.commands[name] = {el: temp, hr}
     return self
   },

  removeCommand: function (name, fully=false) {
    var self = ContextMenu
    pen([self.commands[name].el, self.commands[name].hr]).remove()
    fully === true ? delete self.commands[name] : void 0
    return self
  },

  remove: function () {
    var self = ContextMenu
    for (name in self.commands) {
      self.removeCommand(name)
    }
    return self
  },

  init: function (e) {
    var self = ContextMenu
    pen(self.menu).css({
      top: `${e.clientY}px`,
      left: `${e.clientX}px`
    })

    for (var name in self.commands) {
      pen(self.menu).append(self.commands[name].el, self.commands[name].hr)
    }

    addEventListener("click", self.remove, {once: true})
    pen(body).append(self.menu)
    return self
  },

  style: function (el, ...obj) {
    var self = ContextMenu
    el.match(/commands|cmds/gi) ? pen(self.commands[el]).css([...obj]) : pen(self[el].css([...obj]))
    return self
  }
}

module.exports = ContextMenu
