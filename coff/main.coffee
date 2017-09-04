{app, ipcMain, BrowserWindow} = require 'electron'
path = require 'path'
url = require 'url'

win = null
ops =
  width: 500
  height: 500
  transparent: yes
  frame: no

ipcMain.on 'relaunch', (ev, arg) =>
  app.relaunch()
  app.quit()
  return

create = () ->
  win = new BrowserWindow ops

  win.loadURL url.format
    pathname: "./../index.html"
    protocol: 'file:'
    slashes: yes

  win.on 'closed', () ->
    win = null
    return

  return

app.on 'ready', create

app.on 'window-all-closed', () ->
  if process.platform isnt 'darwin'
    app.quit()

app.on 'activate', () ->
  if not win?
    create
