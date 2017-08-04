chokidar = require 'chokidar'
{remote, ipcRenderer} = require 'electron'
win = remote.getCurrentWindow()
st = """<link id="sty" rel="stylesheet" href="style.css">"""

igs =
  ignored: /\.ps1|\.js|\.sass-cache|\.sassc|\.map|\.sass/gi
watcher = chokidar.watch(".", igs)

watcher.on "all", (ev, path) ->
  ext = path.split('.').pop()
  filenm = path.split('.')[0]
  if ev is 'change'
    if path is 'coff\\main.coffee'
      ipcRenderer.send('relaunch')
    else
      if ext is 'css'
        sty.remove()
        document.head.innerHTML += st
      else if ext isnt 'css'
        win.reload()
  return
