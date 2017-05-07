var chokidar = require('chokidar');
var igs = {
  ignored: /(^|[\/\\])\..|\.js|\.css|main\.js|\.ps1|\.sass-cache|style\.css/
};
var watcher = chokidar.watch(".", igs);
watcher.on("all", function(ev, path) {
  if (ev === 'change') {
    location.reload();
  }
});
module.exports = watcher;
