var $ = require('jquery');
var ipc = require('ipc');

var logo;
$(document).ready(function() {
  logo = $("#tusk_logo");
  animateLogo();
  setTimeout(function() {
    if(localStorage.getItem("username") && localStorage.getItem("password")){
      ipc.send('checkLogin');
      logo.insertAfter($("<p>").text("Checking login..."));
    } else {
      ipc.send('showLogin');
    }
  }, 5000);
});

function animateLogo() {
  logo.animate({opacity: 0.25}, 2000).animate({opacity: 1}, 2000, function() {
    animateLogo();
  });
}
