var color = require('./scripts/color'),
{log, erorr, dir} = console,
{body, head} = document,
{remote} = require('electron'),
wind = remote.getCurrentWindow(),
ContextMenu = require('./scripts/context-menu'),
header = require('./scripts/header'),
watcher = require('./scripts/watcher');

function Start () {

  header.add("X", function(e) {
    e.preventDefault()
    wind.close()
  }, "button")
  .add("[_]", function(e) {
    e.preventDefault()
    wind.maximize()
  }, "button")
  .add("-", function(e) {
    e.preventDefault()
    wind.minimize()
  }, "button")
  .init()

  pen(header.head).css("background-color", color.rgbOfWindow());
  pen(body).css({
    height: `${window.innerHeight-5}px`,
    border: `solid 1px ${color.rgbOfWindow()}`
  })
  ContextMenu.add("reload", function(e) {
    e.preventDefault()
    location.reload()
  }, "button")
  .add("openDevTools", function(e) {
    e.preventDefault()
    wind.openDevTools()
  }, "button")

  addEventListener('keydown', e => {
    if (e.key.match(/f5/gi)) {e.preventDefault();location.reload();}
    if (e.key.match(/f12/gi)) {e.preventDefault();wind.openDevTools();}
  })
  addEventListener('contextmenu', ContextMenu.init)
}

pen(document).on("DOMContentLoaded", Start)
