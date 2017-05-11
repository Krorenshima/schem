var chokidar = require('chokidar');
var igs = {
  ignored: /(^|[\/\\])\..|\.css|\.ps1|\.sass-cache|\.sassc|\.css\.map|style\.css/
};
var watcher = chokidar.watch("../", igs);
watcher.on("all", function(ev, path) {
  if (ev === 'change') {
    location.reload();
  }
});
module.exports = watcher;
