{fs, path, type, log, error, dir
check, setup} = require 'tools'


fromdir = (start, ops, ret2) ->
  start = check start
  ret2 = ret2 or []
  files = fs.readdirSync start
  dirs = files.filter (fle) =>
    stat = fs.lstatSync "#{start}/#{fle}"
    return fle if stat.isDirectory() is true
  .map (fle) => "#{start}/#{fle}"
  files = files.filter (fle) =>
    stat = fs.lstatSync "#{start}/#{fle}"
    return fle if stat.isFile() is true

  if dirs.length isnt 0
    dirs.forEach (dir) =>
      fromdir dir, ops, ret2

  if files.length isnt 0
    filter = null; ignore = null; cb = null;
    for file in files
      {ops, file, whole} = setup file, start, ops
      {filter, ignore, cb} = ops
      ret2.push {file, whole}
    if filter?
      if type(filter) is 'regexp'
        ret2 = ret2.filter (file) => filter.test(file.whole) is true
      else
        ret2 = ret2.filter filter
    if ignore?
      if type(ignore) is 'regexp'
        ret2 = ret2.filter (file) => ignore.test(file.whole) is false
      else
        ret2 = ret2.filter ignore
    return if cb? then cb ret2, start, fname else ret2
  return

module.exports = fromdir
