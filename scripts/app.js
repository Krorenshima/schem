var ContextMenu, Start, body, color, dir, erorr, head, header, log, remote, watcher, wind;

color = require('./scripts/color');

({log, erorr, dir} = console);

({body, head} = document);

({remote} = require('electron'));

wind = remote.getCurrentWindow();

ContextMenu = require('./scripts/context-menu');

header = require('./scripts/header');

watcher = require('./scripts/watcher');

Start = function() {
  header.add("X", function(e) {
    e.preventDefault();
    wind.close();
  }).add("[_]", function(e) {
    e.preventDefault();
    wind.maximize();
  }).add("-", function(e) {
    e.preventDefault();
    wind.minimize();
  }).init();
  header.head.css("background-color", color.rgbOfWindow());
  pen(body).css({
    height: `${window.innerHeight - 5}px`,
    border: `solid 1px ${color.rgbOfWindow()}`
  });
  ContextMenu.add("reload", function(e) {
    e.preventDefault();
    location.reload();
  }).add("openDevTools", function(e) {
    e.preventDefault();
    wind.openDevTools();
  });
  addEventListener('keydown', function(e) {
    if (/f5/gi.test(e.key) === true) {
      e.preventDefault();
      location.reload();
    }
    if (/f12/gi.test(e.key) === true) {
      e.preventDefault();
      wind.openDevTools();
    }
  });
  return addEventListener('contextmenu', ContextMenu.init);
};

pen(document).ready(Start);
