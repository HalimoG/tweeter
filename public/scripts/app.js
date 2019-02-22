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
          <i data-tweet-id=${tweet['_id']} data-tweet-liked="false" data-tweet-likes =${tweet['likes']} class="fas fa-heart"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-flag"></i>
        </div>
    </footer>
  </article>`;
}

function loadTweets(){
  $('.tweet-container').empty();
  $.getJSON( "/tweets", function( json ) {
    
    renderTweets(json);
   });
}

$(document).ready(function() {
 
  //toggles ComposetweetBox
  $("button" ).click(function() {
    $(".box1").slideToggle( "slow", function() {
    });
    $("textarea").focus();  
    });  
 
  // like Button
  $(".tweet-container").on("click", ".fas.fa-heart", function(e) {
    
    var $icon = $(e.target);
    var id = $icon.data("tweet-id");
    var like = $icon.data("tweet-likes");
    var liked = $icon.data("tweet-liked");


    $.ajax({
      url: "/tweets/likes",
      type: "POST",
      data: { 
        id: id,
        count: (liked ? -1 : 1)
      },
      success: function() {
        $icon.data("tweet-liked", !liked)
        $icon.css({"color": $icon.data("tweet-liked") ? "red" : "#00a087"}); 
      }, 
      error: function() {
          alert('Something went wrong');
      }
    });
   });  

  loadTweets();
  // clears composeTweet box and makes count red if over 140 characters
  $(".add-tweet" ).submit(function (event) {
    event.preventDefault();
    let formData = $(this).serialize();
    let charCount = $("textarea").val().length;

    if (charCount === 0){
      $(".error2").css("display", "block");
    }
    else if (charCount > 140){ 
      $(".error2").html("tweet can only be 140 characters or less")
      $(".error2").css("display", "block");
    }
  
   else {
     $.post( "/tweets", formData)
     .done(function() {
    loadTweets();
    $(".error1").css("display", "none");
    $(".error2").css("display", "none");
    $(".counter").text(140);
    $("textarea").val("");
    });
    }
  });

});