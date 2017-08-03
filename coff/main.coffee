{app, BrowserWindow, globalShortcut, remote, ipcMain} = require 'electron'
path = require 'path'
url = require 'url'
win = null
ops =
  width: 500, height: 500,
  frame: no, transparent: yes

ipcMain.on 'relaunch', (ev, arg) ->
  app.relaunch()
  app.quit()

create = ->
  win = new BrowserWindow(ops)
  win.loadURL url.format
    pathname: "#{__dirname}/../index.html"
    protocol: 'file:'
    slashes: true
  win.on 'closed', () => win = null
  return

app.on 'ready', create

app.on 'window-all-closed', () ->
  if process.platform isnt 'darwin'
    app.quit()
  return

app.on 'activate', () ->
  if win is null
    create()
