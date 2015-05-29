var $ = require('jquery');
var ipc = require('ipc');

var logo;
$(document).ready(function() {
  logo = $("#tusk_logo img");
  animateLogo();
  setTimeout(function() {
    if(localStorage.getItem("username") && localStorage.getItem("session")){
      checkLogin();
    } else {
      ipc.send('showLogin');
    }
  }, 5000);
});

function animateLogo() {
  logo.animate({opacity: 0.25}, 2000).animate({opacity: 1}, 2000, function() {
    animateLogo();
  });
};

function checkLogin() {
  $("#status").text("Checking login...");
};
