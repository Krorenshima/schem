file = do ->
  {log, error, dir} = console
  fs = require 'fs'
  type = require 'type'
  file = (f, enc = 'utf8', syncAc = true) ->
    return new file arguments... if !(@ instanceof file)
    it = this
    @fname = f
    @file = do =>
      if fs.existsSync(f)
        if fs.lstatSync(f).isFile() is true
          f = fs.readFileSync(f, enc)
        else
          throw new Error "#{f} isn't a file"
      return f
    @synchronusActions = syncAc
    @encoding = enc

  file.data = file:: = {}

  file::change = (key, val) ->
    @[key] = val
    return this

  file::exists = file::checkExistance = () => fs.existsSync(@fname)

  file::remove = () ->
    if @exists() is true
      fs.unlinkSync(@fname)
    else
      log "Tried to remove a non-existant file"
    return this

  file::write = () ->
    args = arguments
    return

  # file::write.file = {}
  #
  # file::write.file.async = (data, append = true) ->

  file::read = (sync) ->

  return file
