var dir, env, error, fetch, fs, hdir, log;

({log, error, dir} = console);

fetch = require('node-fetch');

fs = require('fs');

env = require('env');

hdir = env('userprofile');

module.exports = function(Url, Loc, Name, Homedir) {
  var isFinished;
  isFinished = false;
  if (Homedir == null) {
    Homedir = true;
  }
  Loc = Loc.replace(/\\/gi, '/');
  if (Name != null) {
    Name = `${Name}.${Url.split(/\/+/gi).pop().split('.').pop()}`;
  } else {
    Name = Url.split(/\/+/gi).pop();
  }
  fetch(Url).then((resp) => {
    var out, res;
    res = `${(Homedir === true ? `${hdir}/` : 'C:/')}${Loc}/${Name}`;
    out = fs.createWriteStream(res);
    resp.body.pipe(out).on("opened", function(e) {
      log("downloading");
    }).on("close", function(e) {
      log(`download finished, saved as '${Name}'`);
    }).on("error", function(e) {
      log("download failed");
    });
  });
  isFinished = true;
  return isFinished;
};
