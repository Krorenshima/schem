var {app, BrowserWindow, globalShortcut, remote} = require('electron')
var path = require('path');
var url = require('url');
var win = null;
ops = {width: 500, height: 500,
  frame: false, transparent: true};

create = function() {
  win = new BrowserWindow(ops);
  win.loadURL(url.format({
    pathname: path.join(__dirname, '..', 'index.html'),
    protocol: 'file:', slashes: true}));
  win.on('closed', () => {win = null;});
};

app.on('ready', create);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (win === null) {
    create();
  }
});
