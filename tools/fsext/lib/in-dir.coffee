{fs, path, type, log, error, dir
check, setup} = require 'tools'


module.exports = (start, ops) ->
  start = check start
  files = fs.readdirSync start
  files = files.filter (file) =>
    stat = fs.lstatSync "#{start}/#{file}"
    return file if stat.isFile() is true
  ret = []
  if files.length isnt 0
    filter = null
    ignore = null
    cb = null
    files.forEach (file) =>
      {ops, file, whole} = setup file, start, ops
      {filter, ignore, cb} = ops
      ret.push {file, whole}
    if filter?
      if type(filter) is 'regexp'
        ret = ret.filter (file) => filter.test(file.whole) is true
      else
        ret = ret.filter filter

    if ignore?
      if type(ignore) is 'regexp'
        ret = ret.filter (file) => ignore.test(file.whole) is false
      else
        ret = ret.filter ignore
    return if cb? then cb ret, start, fname else ret
  return
