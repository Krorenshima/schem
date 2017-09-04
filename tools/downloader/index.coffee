{log, error, dir} = console
fetch = require 'node-fetch'
fs = require 'fs'
env = require 'env'
hdir = env('userprofile')
module.exports = (Url, Loc, Name, Homedir) ->
  isFinished = false
  Homedir ?= true
  Loc = Loc.replace /\\/gi, '/'
  if Name?
    Name = "#{Name}.#{Url.split(/\/+/gi).pop().split('.').pop()}"
  else
    Name = Url.split(/\/+/gi).pop()
  fetch(Url)
  .then (resp) =>
    res = "#{if Homedir is true then "#{hdir}/" else 'C:/'}#{Loc}/#{Name}"
    out = fs.createWriteStream(res)
    resp.body.pipe(out)
    .on "opened", (e) ->
      log "downloading"
      return
    .on "close", (e) ->
      log "download finished, saved as '#{Name}'"
      return
    .on "error", (e) ->
      log "download failed"
      return
    return
  isFinished = true
  return isFinished
