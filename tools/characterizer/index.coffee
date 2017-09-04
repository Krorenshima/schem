char = do ->
  {log, error, dir, fs, parse, stringify, type} = require 'tools'
  char = (ch, age, sex, fileLoc) ->
    parse ch if type ch is 'string' and ch.contains '{'
    return new char arguments... if !(@ instanceof char)
    if ch instanceof char
      for prop of ch
        @[prop] = ch[prop]
    else
      @name = ch
      @age = age
      @sex = sex
      @individualFileLoc = fileLoc
      @autoSave = true
    @globalName = if @name.length >= 6 then @name.substring(0, 4) else @name.substring(0, 3)
    global[@name] = global[@globalName] = this
    return

  char.info = char:: = {}

  char::save = () ->
    fs.writeFileSync(@individualFileLoc, stringify(this, null, 2), "utf8")
    return this

  char::retrieve = (key) ->
    return @[key]

  char::set = (key, value) ->
    @[key] = value
    @save()
    return this

  char::remove = (key, value, overWrite = false) ->
    if not @[key]?
      @[key] = value
    else
      if overWrite is true
        @[key] = value
      else
        log "Use #{@name}.set instead"
    @save()
    return this

  return char

characterizer =
  parse: (filedir) ->
    filedir = filedir.replace /\\/gi, '/'
    char(fs.readFileSync(filedir, "utf8"))

  newChar: (name, age, sex, fileLoc) ->
    ref = char(name, age, sex, fileLoc)
    ref.save()

module.exports = characterizer
