var v = document.getElementById("video");
var t = document.getElementById("timer");
var p = document.getElementById("play");
var s1n = document.getElementById("sign_in");
var s2n = document.getElementById("download_tickets");
var s3n = document.getElementById("make_selection");
var s4n = document.getElementById("launch_scanner");
var msg = document.getElementById("message-container");
var ctl = document.getElementById("control");
var radio_check = document.getElementById("radio_btn_checked");
var showclix_party = document.getElementById("showclix_party");
var radio_hide = document.getElementById("radio_btn_unchecked");
var online_special = document.getElementById("online_special");
var dismiss = document.getElementById("dismiss");

var safari = (navigator.userAgent.toString().toLowerCase().indexOf("safari") != -1) && (navigator.userAgent.toString().toLowerCase().indexOf("chrome") == -1);

var chrome = (navigator.userAgent.toString().toLowerCase().indexOf("chrome") != -1);


if(!safari && !chrome){
  $('.not_compatible').show();
};

$(document).ready(function(){
  $(msg).add('.iphone-container').fadeIn(1000);
  $('.ps').delay(1000).fadeIn();
});

// BEGIN button
p.onclick = function() {
  v.play();
  $(msg).add('.ps').fadeOut();
}

// step 1 click actions
s1n.onclick = function() {
  v.play();
  $(msg).add('.ps').fadeOut();
  s1n.className = "button next";
}

// step 2 click actions
s3n.onclick = function() {
  v.play();
  $(msg).add('.ps').fadeOut();
  s3n.className = "button next";
}

// Launch Scanner
s4n.onclick = function() {
  v.play();
  $(msg).add('.ps').fadeOut();
  s4n.className = "button next";
}

// tap to dismiss
dismiss.onclick = function() {
  v.play();
  $(msg).add('.ps').fadeOut();
  dismiss.className = "button next";
}

var stepOne = function(v) {
  $("#message > h2").html(
    "Sign In"
  );
  $("#message > .ps").html(
    "<p>Once you've entered your ShowClix account info, you'll tap <b>Sign In</b> to enter the app.</p>"
    );
  $(msg).fadeIn();
  $('.ps').delay(1000).fadeIn();
  s1n.className = "button next active";
};

var stepTwo = function(v) {
  $("#message > h2").html(
    "Download Tickets"
  );
  $("#message > .ps").html(
    "<p>When you sign in, Axess will automatically download and display your upcoming events. Select <b>ShowClix Party</b> and then tap <b>Download Tickets</b>. Once they're finished, tap the screen to continue.</p>"
    );
  $(msg).fadeIn();
  $('.ps').delay(1000).fadeIn();
  $(radio_check).show();
  $(showclix_party).show();
  $(showclix_party).click(function(){
    console.log("what's up");
    $(radio_check).fadeTo(100,1);
    s2n.className = "button next active";
  });
  $(s2n).click(function(){
    v.play();
    $(this).delay(800).fadeTo(100,0);
    $(radio_check).delay(500).fadeTo(1000,0);
    $(showclix_party).hide();
  });
};

var stepThree = function(v) {
  $(s2n).add(radio_check).hide();
  dismiss.className = "button next active";
};

var stepFour = function(v) {
  $("#message > h2").html(
    "Select Price Levels"
  );
  $("#message > .ps").html(
    "<p>Now it's time to select which price levels you'll be scanning. Let's deselect the <b>Online Special</b> price level and then tap <b>Make Selection</b> to confirm.</p>"
    );
  $(msg).fadeIn();
  $('.ps').delay(1000).fadeIn();
  $(radio_hide).add(online_special).show();
  $(online_special).click(function(){
    console.log("what's up");
    $(this).hide();
    $(radio_hide).fadeTo(100,1);
    s3n.className = "button next active";
  });
  $(s3n).click(function(){
    v.play();
    $(this).delay(800).fadeTo(100,0);
    $(radio_hide).delay(500).fadeTo(1000,0);
  });
};

var stepFive = function(v) {
  $("#message > h2").html(
    "Start Scanning!"
  );
  $("#message > .ps").html(
    "<p>Now you're ready to scan. Click <b>Launch Scanner</b> to open your camera and begin scanning barcodes!</p>"
    );
  $(msg).fadeIn();
  $('.ps').delay(1000).fadeIn();
  s4n.className = "button next active";
};

var stepSix = function(v) {
  $("#message > h2").html(
    "Validation & Responses"
  );
  $("#message > .ps").html(
    "<p>A green screen is displayed for valid tickets, and a red screen will display for invalid tickets, along with a brief message that explains the problem.</p><p>That wraps up this demo of Axess! (If you want to learn more about what you can do with Axess, visit our <a href=\'http://support.showclix.com/customer/portal/topics/616556-ticket-scanning/articles\''>help guide</a>.)</p><a href=\"/axess-demo\"><div id=\"restart\" class=\"control\">Restart</div></a>"
    );
  $(s1n).add(s2n).add(s3n).add(s4n).add(dismiss).add(showclix_party).add(radio_check).add(radio_hide).hide();
  $(msg).fadeIn();
  $('.ps').delay(1000).fadeIn();
  $(v).pause();
};

var happenings = {
  5.5 : {
    fn: stepOne,
    happened: false
  },
  10.5 : {
    fn: stepTwo,
    happened: false
  },
  13 : {
    fn: stepThree,
    happened: false
  },
  16 : {
    fn: stepFour,
    happened: false
  },
  19 : {
    fn: stepFive,
    happened: false
  },
  24 : {
    fn: stepSix,
    happened: false
  },
}

v.addEventListener('timeupdate', function() {
    t.innerHTML = this.currentTime;
    var currentTime = this.currentTime;
    for(var tstamp in happenings) {
      if(currentTime > tstamp) {
        if(!happenings[tstamp].happened) {
          var v = document.getElementById("video");
          v.pause();
          happenings[tstamp].happened = true;
          var fn = happenings[tstamp].fn;
          fn && fn(v);
        }
      }
    }
});
