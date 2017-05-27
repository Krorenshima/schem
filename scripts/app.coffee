color = require './scripts/color'
{log, erorr, dir} = console
{body, head} = document
{remote} = require 'electron'
wind = remote.getCurrentWindow()
ContextMenu = require './scripts/context-menu'
header = require './scripts/header'
watcher = require './scripts/watcher'

Start = ->

  header.add "X", (e) ->
    e.preventDefault()
    wind.close()
    return
  .add "[_]", (e) ->
    e.preventDefault()
    wind.maximize()
    return
  .add "-", (e) ->
    e.preventDefault()
    wind.minimize()
    return
  .init()

  header.head.css "background-color", color.rgbOfWindow()
  pen(body).css
    height: "#{window.innerHeight-5}px",
    border: "solid 1px #{color.rgbOfWindow()}"
  ContextMenu.add "reload", (e) ->
    e.preventDefault()
    location.reload()
    return
  .add "openDevTools", (e) ->
    e.preventDefault()
    wind.openDevTools()
    return

  addEventListener 'keydown', (e) ->
    if /f5/gi.test(e.key) is true
      e.preventDefault()
      location.reload()
    if /f12/gi.test(e.key) is true
      e.preventDefault()
      wind.openDevTools()
    return
  addEventListener('contextmenu', ContextMenu.init)

pen(document).ready(Start)
