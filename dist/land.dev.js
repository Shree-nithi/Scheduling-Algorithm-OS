"use strict";

// Init
var $ = jQuery;
var animationTime = 5,
    days = 7;
$(document).ready(function () {
  // timer arguments: 
  //   #1 - time of animation in mileseconds, 
  //   #2 - days to deadline
  $('#progress-time-fill, #death-group').css({
    'animation-duration': animationTime + 's'
  });

  var deadlineAnimation = function deadlineAnimation() {
    setTimeout(function () {
      $('#designer-arm-grop').css({
        'animation-duration': '1.5s'
      });
    }, 0);
    setTimeout(function () {
      $('#designer-arm-grop').css({
        'animation-duration': '1s'
      });
    }, 4000);
    setTimeout(function () {
      $('#designer-arm-grop').css({
        'animation-duration': '0.7s'
      });
    }, 8000);
    setTimeout(function () {
      $('#designer-arm-grop').css({
        'animation-duration': '0.3s'
      });
    }, 12000);
    setTimeout(function () {
      $('#designer-arm-grop').css({
        'animation-duration': '0.2s'
      });
    }, 15000);
    setTimeout(function () {
      window.location.href = "try.html";
    }, 5000);
  };

  function timer(totalTime, deadline) {
    var time = totalTime * 1000;
    var dayDuration = time / deadline;
    var actualDay = deadline;
    var timer = setInterval(countTime, dayDuration);

    function countTime() {
      --actualDay;
      $('.deadline-days .day').text(actualDay);

      if (actualDay == 0) {
        clearInterval(timer);
        $('.deadline-days .day').text(deadline);
        setTimeout(function () {
          window.location.href = "index.html"; // replace with the name of the next HTML file
        }, 5000); // change the number of milliseconds here to adjust the delay before the redirect
      }
    }
  }

  var deadlineText = function deadlineText() {
    var $el = $('.deadline-days');
    var html = '<div class="mask-red"><div class="inner">' + $el.html() + '</div></div><div class="mask-white"><div class="inner">' + $el.html() + '</div></div>';
    $el.html(html);
  };

  deadlineText();
  deadlineAnimation();
  timer(animationTime, days);
  setInterval(function () {
    timer(animationTime, days);
    deadlineAnimation();
    console.log('begin interval', animationTime * 1000);
  }, animationTime * 1000);
});
//# sourceMappingURL=land.dev.js.map