var color = require('./color'),
{log, erorr, dir} = console, {body, head} = document,
{remote} = require('electron'), wind = remote.getCurrentWindow(),
contextmenu = require('./context-menu'), header = require('./header'),
watcher = require('./watcher');

header.addButton("X", () => wind.close())
.addButton("[_]", () => wind.maximize())
.addButton("-", () => wind.minimize())
.init()

pen(header.head).Css("background-color", color.rgbOfWindow());
pen(body).Css({
  height: `${window.innerHeight-5}px`
})
contextmenu.addCommand("reload", () => location.reload())
.addCommand("openDevTools", () => wind.openDevTools())
.addCommand("refresh", () => {})

window.addEventListener('keydown', e => {
  if (e.key.match(/f5/gi)) {e.preventDefault();location.reload();}
  if (e.key.match(/f12/gi)) {e.preventDefault();wind.openDevTools();}
})
window.addEventListener('contextmenu', contextmenu.init)
