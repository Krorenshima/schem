var color = require('./color');
var contextmenu = {
  commands: {},
  menu: pen("div").Class("contextmenu").returnElement(),
  addCommand: function(cover, ev) {
    contextmenu.commands[cover] = {
      el: pen("span").Html(cover).Class("contextmenu-command").On("click", ev).returnElement(),
      hr: pen("hr").Class("contextmenu-divider").returnElement()
    };
    return contextmenu;
  },
  removeCommand: function(name) {
    pen(contextmenu.commands[name].el).Remove();
    pen(contextmenu.commands[name].hr).Remove();
    return contextmenu;
  },
  remove: function() {
    for (var name in contextmenu.commands) {contextmenu.removeCommand(name);}
    pen(contextmenu.menu).Remove();
    window.removeEventListener("click", contextmenu.remove);
    return contextmenu;
  },
  init: function(e) {
    pen(contextmenu.menu).Css({top: `${e.clientY}px`, left: `${e.clientX}px`, 'background-color': color.rgbaOfWindow(1)});
    for (var name in contextmenu.commands) {pen(contextmenu.menu).Append(contextmenu.commands[name].el, contextmenu.commands[name].hr);}
    pen(contextmenu.menu).AppendTo(body);
    window.addEventListener("click", contextmenu.remove);
    return contextmenu;
  }
};

module.exports = contextmenu;
