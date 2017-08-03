win = require('electron').remote.getCurrentWindow()
$ = (el) => document.querySelector(el)
$('.close-button').addEventListener "click", (e) ->
  e.preventDefault()
  win.close()
$('.minimize-button').addEventListener "click", (e) ->
  e.preventDefault()
  win.minimize()
$('.maximize-button').addEventListener "click", (e) ->
  e.preventDefault()
  win.maximize()
$('.title').innerText = document.title
