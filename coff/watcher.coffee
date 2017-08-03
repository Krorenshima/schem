chokidar = require 'chokidar'
{remote, ipcRenderer} = require 'electron'
win = remote.getCurrentWindow()
st = """<link id="mainst" rel="stylesheet" href="style.css">"""
igs =
  ignored: /\.css|\.ps1|\.js|\.sass-cache|\.sassc|\.css\.map|style\.css/gi
watcher = chokidar.watch(".", igs)
watcher.on "all", (ev, path) ->
  ext = path.split('.').pop()
  filenm = path.split('.')[0]
  if ev is 'change'
    if path is 'coffee\\main.coffee'
      ipcRenderer.send('relaunch')
    else
      if ext is 'css'
        sty.remove()
        document.head.innerHTML += "st"
      else if ext isnt 'sass'
        win.reload()
  return
module.exports = watcher
