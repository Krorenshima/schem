var header = {
  buttons: {},
  head: pen("div").Class("header").returnElement(),
  title: pen("span").Class("title").Html(document.title).returnElement(),
  addButton: function(view, event) {
    header.buttons[view] = pen("span").Css("-webkit-app-region", "no-drag").Class("header-button Ril").Html(view).On("click", event).returnElement();
    return header;
  },
  removeButton: function(name) {
    pen(header.buttons[name]).Remove();
    delete header.buttons[name];
    return header;
  },
  init: function() {
    pen(header.head).Append(header.title);
    for (var name in header.buttons) {pen(header.head).Append(header.buttons[name]);}
    pen(document.body).Append(header.head);
    return header;
  }
};

module.exports = header;
