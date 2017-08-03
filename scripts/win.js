var $, win;

win = require('electron').remote.getCurrentWindow();

$ = (el) => {
  return document.querySelector(el);
};

$('.close-button').addEventListener("click", function(e) {
  e.preventDefault();
  return win.close();
});

$('.minimize-button').addEventListener("click", function(e) {
  e.preventDefault();
  return win.minimize();
});

$('.maximize-button').addEventListener("click", function(e) {
  e.preventDefault();
  return win.maximize();
});

$('.title').innerText = document.title;
