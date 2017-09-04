var BrowserWindow, app, create, ipcMain, ops, path, url, win;

({app, ipcMain, BrowserWindow} = require('electron'));

path = require('path');

url = require('url');

win = null;

ops = {
  width: 500,
  height: 500,
  transparent: true,
  frame: false
};

ipcMain.on('relaunch', (ev, arg) => {
  app.relaunch();
  app.quit();
});

create = function() {
  win = new BrowserWindow(ops);
  win.loadURL(url.format({
    pathname: "./../index.html",
    protocol: 'file:',
    slashes: true
  }));
  win.on('closed', function() {
    win = null;
  });
};

app.on('ready', create);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    return app.quit();
  }
});

app.on('activate', function() {
  if (win == null) {
    return create;
  }
});
