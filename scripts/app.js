var body, dir, erorr, head, log, remote, watcher, wind;

({log, erorr, dir} = console);

({body, head} = document);

({remote} = require('electron'));

wind = remote.getCurrentWindow();

watcher = require('./scripts/watcher');
