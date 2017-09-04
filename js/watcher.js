var igs, watcher;

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
      ipcren.send("relaunch");
    } else {
      if (ext === 'css') {
        sty.remove();
        pHead.append(sty);
      } else if (ext === 'js') {
        win.reload();
      }
    }
  }
  if (ev === 'unlink') {
    win.reload();
  }
});
