igs =
  ignored: /\.ps1|\.js|\.sass-cache|\.sassc|\.map|\.sass/gi

watcher = chokidar.watch(".", igs)

watcher.on "all", (ev, path) ->
  ext = path.split('.').pop()
  filenm = path.split('.')[0]
  if ev is 'change'
    if path is 'coff\\main.coffee'
      ipcren.send("relaunch")
    else
      if ext is 'css'
        sty.remove()
        pHead.append sty
      else if ext is 'js'
        win.reload()
  if ev is 'unlink'
    win.reload()
  return
