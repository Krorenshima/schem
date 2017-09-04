`var slice;`
fs = require 'fs'; path = require 'path'
type = require 'type';
{error, dir} = console
argvs = require 'process-args'
childp = require 'child_process'
fsextra = fsext = require 'fsext'
env = require 'env'
file = require 'file'
downloader = require 'downloader'
charact = characterizer = require 'characterizer'
attrs = require 'attrs'

`slice = (arr) => Array.prototype.slice.call(arr)`

log = () ->
  args = arguments
  nargs = slice args
  nargs.forEach (arg) =>
    process.stdout.write "#{arg}\n"
    console.log "#{arg}"
    return
  return

check = (str) =>
  str = str.replace /\\/gi, '/'
  if fs.existsSync(str) is false
    throw new Error "Path #{str} doesn't exist"
  return str

setup = (file, start, ops) =>
  fname = path.join(start, file).replace /\\/g, '/'
  opz =
    ignore: (if ops? and ops.ignore? then ops.ignore else null)
    filter: (if ops? and ops.filter? then ops.filter else null)
    cb: (if ops? and ops.cb? then ops.cb else null)
  normreg = /([^\n\.\\]+)\.([^\n]+)$/m
  dotfilereg = /(\.[^\n\\]+)$/m
  if normreg.test(file) is true
    f = normreg.exec(file)
    if !f?
      f = file
    else
      f = f[1..2]
  else if dotfilereg.test(file) is true
    f = dotfilereg.exec(file)
    if !f?
      f = file
    else
      f = f[1]

  ozg =
    ops: opz
    path: fname.split('/')
    file: f
    whole: fname
  return ozg

{parse, stringify} = JSON

module.exports = {
  fs, path, type, log, error, dir
  check, setup, slice, parse, stringify
  argvs, childp, fsext, fsextra, fsext
  env, file, downloader, charact, characterizer
  attrs
}
