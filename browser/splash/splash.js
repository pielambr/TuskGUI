var $ = require('jquery');
var ipc = require('ipc');
var constants = require('../../app/constants');

var logo;
var retries;
$(document).ready(function() {
  logo = $("#tusk_logo img");
  retries = 0;
  animateLogo();
  setTimeout(function() {
    if(localStorage.getItem("username") && localStorage.getItem("session")){
      $("#status").text("Checking login...");
      checkLogin();
    } else {
      ipc.send('showLogin');
    }
  }, 3000);
});

function animateLogo() {
  logo.animate({opacity: 0.25}, 2000).animate({opacity: 1}, 2000, function() {
    animateLogo();
  });
};

function getBasicAuth() {
  var creds = localStorage.getItem("username") + ":" + localStorage.getItem("session");
  return "Basic " + btoa(creds);
}

function checkLogin() {
  if(retries < 5) {
    var timeout = setTimeout(function() {
      ajax.abort();
      $("#status").text("Login failed... Retry #" + retries + 1);
      checkLogin();
    }, 5000);
    var ajax = $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", getBasicAuth());
      },
      url: constants.TUSK_ROOT + constants.CONVERSATION_ENDPOINT,
      success: function() {
        clearTimeout(timeout);
        ipc.send('showMessages');
      },
      error: function() {
        clearTimeout(timeout);
        $("#status").text("An error happened while logging in, please login again");
        setTimeout(function(){
          ipc.send('showLogin');
        }, 2000);
      }
    });
  } else {
    $("#status").text("Maximum retries failed, redirecting to login...");
    setTimeout(function() {
      ipc.send('showLogin');
    }, 2000);
  }
};
