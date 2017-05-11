var color = require('./scripts/color'),
{log, erorr, dir} = console,
{body, head} = document,
{remote} = require('electron'),
wind = remote.getCurrentWindow(),
contextmenu = require('./scripts/context-menu'),
header = require('./scripts/header'),
watcher = require('./scripts/watcher');

header.addButton("X", function(e) {
  e.preventDefault()
  wind.close()
})
.addButton("[_]", function(e) {
  e.preventDefault()
  wind.maximize()
})
.addButton("-", function(e) {
  e.preventDefault()
  wind.minimize()
})
.init()

pen(header.head).css("background-color", color.rgbOfWindow());
pen(body).css({
  height: `${window.innerHeight-5}px`
})
contextmenu.addCommand("reload", function(e) {
  e.preventDefault()
  location.reload()
})
.addCommand("openDevTools", function(e) {
  e.preventDefault()
  wind.openDevTools()
})
.addCommand("refresh", () => {})

addEventListener('keydown', e => {
  if (e.key.match(/f5/gi)) {e.preventDefault();location.reload();}
  if (e.key.match(/f12/gi)) {e.preventDefault();wind.openDevTools();}
})
addEventListener('contextmenu', contextmenu.init)
