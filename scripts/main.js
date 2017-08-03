var BrowserWindow, app, create, globalShortcut, ipcMain, ops, path, remote, url, win;

({app, BrowserWindow, globalShortcut, remote, ipcMain} = require('electron'));

path = require('path');

url = require('url');

win = null;

ops = {
  width: 500,
  height: 500,
  frame: false,
  transparent: true
};

ipcMain.on('relaunch', function(ev, arg) {
  app.relaunch();
  return app.quit();
});

create = function() {
  win = new BrowserWindow(ops);
  win.loadURL(url.format({
    pathname: `${__dirname}/../index.html`,
    protocol: 'file:',
    slashes: true
  }));
  win.on('closed', () => {
    return win = null;
  });
};

app.on('ready', create);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (win === null) {
    return create();
  }
});
