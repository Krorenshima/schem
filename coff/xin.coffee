{log} = console
{childp, fs, env, type, error, dir} = require 'tools'
chokidar = require 'chokidar'
{remote, ipcRenderer} = require 'electron'
pack = require './package.json'
ipcren = ipcRenderer
win = remote.getCurrentWindow()

title = pen "<title id='ttle'>"
sty = pen "<link id='sty' rel='stylesheet' href='style.css'>"
wrapper = pen "<div id='wrpr' class='wrapper'>"

pen(document).ready () ->
  pBody.append wrapper
  pHead.append sty, title
  clsBtn = pen ".close-button"
  minBtn = pen ".minimize-button"
  maxBtn = pen ".maximize-button"
  clsBtn.click (e) ->
    e.preventDefault()
    win.close()
    return
  minBtn.click (e) ->
    e.preventDefault()
    win.minimize()
    return
  maxBtn.click (e) ->
    e.preventDefault()
    win.maximize()
    return
  title.html pack.name
  pen('.title').html pack.name
