(function(window) {
  var body, head, header, test;
  test = require('./test');
  ({body, head} = document);
  header = {
    buttons: {},
    head: pen('<div class="header">'),
    title: pen('<span class="title Lil">').html(document.title),
    add: function(name, evhr, buttonType = "button", el) {
      var prefix, self, temp;
      self = header;
      prefix = "header-button";
      el = `<${el} class='${prefix} custom Ril'>`;
      if (buttonType.match(/link/gi)) {
        temp = pen(`<a class='${prefix} link Ril' href='evhr'>`).html(name);
      } else if (buttonType.match(/button/gi)) {
        temp = pen(`<span class='${prefix} Ril'>`).on('click', evhr).html(name);
      } else if (buttonType.match(/custom/gi)) {
        temp = type(evhr) === 'function' ? pen(el).on('click', evhr).html(name) : pen(el).href(evhr).html(name);
      }
      self.buttons[name] = temp;
      return self;
    },
    removeButton: function(name, fully) {
      var self;
      self = header;
      pen(self.buttons[name]).remove();
      if (fully === true) {
        delete self.buttons[name];
      } else {
        void 0;
      }
      return self;
    },
    init: function() {
      var brs, i, j, name, self;
      self = header;
      brs = [];
      pen(self.head).append(self.title);
      for (name in self.buttons) {
        pen(self.head).append(self.buttons[name]);
      }
      pen(body).append(self.head);
      for (i = j = 0; j <= 3; i = ++j) {
        brs[i] = pen('<br>').el;
        body.insertBefore(brs[i], body.childNodes[0]);
      }
      return self;
    }
  };
  module.exports = header;
})(window);
