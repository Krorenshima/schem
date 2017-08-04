var chokidar, igs, ipcRenderer, remote, st, watcher, win;

chokidar = require('chokidar');

({remote, ipcRenderer} = require('electron'));

win = remote.getCurrentWindow();

st = "<link id=\"sty\" rel=\"stylesheet\" href=\"style.css\">";

igs = {
  ignored: /\.ps1|\.js|\.sass-cache|\.sassc|\.map|\.sass/gi
};

watcher = chokidar.watch(".", igs);

watcher.on("all", function(ev, path) {
  var ext, filenm;
  ext = path.split('.').pop();
  filenm = path.split('.')[0];
  if (ev === 'change') {
    if (path === 'coff\\main.coffee') {
      ipcRenderer.send('relaunch');
    } else {
      if (ext === 'css') {
        sty.remove();
        document.head.innerHTML += st;
      } else if (ext !== 'css') {
        win.reload();
      }
    }
  }
});
