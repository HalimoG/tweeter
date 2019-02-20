function renderTweets(tweets) {
  for (var tweet of tweets){
    var $tweet = createTweetElement(tweet);
    $('.tweet-container').append($tweet);
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
        <img src=${tweet.user["avatars"]["regular"]}>
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
      <p>${escape(tweet["content"]["text"])}</p>
    </div>
    <footer>${tweet["created_at"]}
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
  loadTweets();
$( "form" ).submit(function (event) {
  event.preventDefault();

  let formData = $(this).serialize();
  $.post( "/tweets", formData)
  .done(function() {
    console.log("made post request")
    loadTweets();
  });
});

});

