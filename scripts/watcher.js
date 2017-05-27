var chokidar, igs, watcher;

chokidar = require('chokidar');

igs = {
  ignored: /(^|[\/\\])\..|\.css|\.ps1|\.js|\.sass-cache|\.sassc|\.css\.map|style\.css/
};

watcher = chokidar.watch("../", igs);

watcher.on("all", function(ev, path) {
  if (ev === 'change') {
    location.reload();
  }
});

module.exports = watcher;
