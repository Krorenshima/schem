{fs, path, type, log, error, dir
check, setup} = require 'tools'


walk = (start, ret4) ->
  start = check start, start
  ret4 = ret4 or []
  files = fs.readdirSync start
  for file in files
    {fname} = setup file, start
    stat = fs.lstatSync fname
    ret4.push fname
    walk(fname, ret4) if stat.isDirectory() is true
  return ret4

module.exports = walk
