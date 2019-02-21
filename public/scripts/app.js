function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

function renderTweets(tweets) {
  for (var tweet of tweets){
    var $tweet = createTweetElement(tweet);
    $('.tweet-container').prepend($tweet);
  }
}
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


function createTweetElement (tweet){

  return `<article class ="tweet">
    <header>
      <div class="avatar">
        <img src=${tweet.user["avatars"]["small"]}>
      </div>
      <div class= "name">
        <h2>${tweet["user"]["name"]}</h2>
      </div>
      <div class = "handle">
        <span>${tweet["user"]["handle"]}</span>
      </div>
    </header>
    </div>
    <div class = "body">
      <p>${escape(tweet["content"]["text"])}
      </p>
    </div>
    <footer>${timeSince(parseInt(tweet["created_at"]))}
        <div class="icons">
            <i class="fas fa-heart"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-flag"></i>
          </div>
    </footer>
  </article>`;
}

function loadTweets(){
  $('.tweet-container').empty();
  $.getJSON( "/tweets", function( json ) {
    
    console.log( "JSON Data: ", json);
    renderTweets(json);
   });
}


$(document).ready(function() {
  $( "button" ).click(function() {
    $(".box1").slideToggle( "slow", function() {
      
  });
        $("textarea").focus();  
    });  
  
  loadTweets();

  $( "form" ).submit(function (event) {
  event.preventDefault();
  let formData = $(this).serialize();
  let charCount = $("textarea").val().length;

    if (charCount === 0){

      $(".error2").css("display", "block");

    }
    else if (charCount > 140){
      $(".error1").css("display", "block");
      $(".error2").css("display", "none");

    }
  
   else {
     $.post( "/tweets", formData)
  .done(function() {
    console.log("made post request");
    loadTweets();
    $(".error1").css("display", "none");
    $(".error2").css("display", "none");
  });
  }
});

});

