var childp, chokidar, dir, env, error, fs, ipcRenderer, ipcren, log, pack, remote, sty, title, type, win, wrapper;

({log} = console);

({childp, fs, env, type, error, dir} = require('tools'));

chokidar = require('chokidar');

({remote, ipcRenderer} = require('electron'));

pack = require('./package.json');

ipcren = ipcRenderer;

win = remote.getCurrentWindow();

title = pen("<title id='ttle'>");

sty = pen("<link id='sty' rel='stylesheet' href='style.css'>");

wrapper = pen("<div id='wrpr' class='wrapper'>");

pen(document).ready(function() {
  var clsBtn, maxBtn, minBtn;
  pBody.append(wrapper);
  pHead.append(sty, title);
  clsBtn = pen(".close-button");
  minBtn = pen(".minimize-button");
  maxBtn = pen(".maximize-button");
  clsBtn.click(function(e) {
    e.preventDefault();
    win.close();
  });
  minBtn.click(function(e) {
    e.preventDefault();
    win.minimize();
  });
  maxBtn.click(function(e) {
    e.preventDefault();
    win.maximize();
  });
  title.html(pack.name);
  return pen('.title').html(pack.name);
});
