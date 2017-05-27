chokidar = require 'chokidar'
igs =
  ignored: /(^|[\/\\])\..|\.css|\.ps1|\.js|\.sass-cache|\.sassc|\.css\.map|style\.css/
watcher = chokidar.watch("../", igs)
watcher.on "all", (ev, path) ->
  if ev is 'change'
    location.reload()
  return
module.exports = watcher
