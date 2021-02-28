$(document).ready(function () {


  //Counts character and changes color
  $('textarea').on('input', charCountColour);

  // loops array of tweet objects and appends each to ".messages"
  const renderTweets = function (tweets) {
    //if u can get away with it, empty-> repopulate works
    $('.messages').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.messages').prepend($tweet);
    }
  };

  // user submits a tweet
  $('form').submit(function (event) {
    event.preventDefault();
    const tweetData = $(this).serialize();
    const tweetLength = $('textarea').val().length;

    //alerts thrown if length is 0 or too long
    if (validateTweet(tweetLength)) {
      $.ajax({
        url: '/tweets',
        method: "POST",
        data: tweetData
      })
        .then(loadTweets)
        .then(resetState)
        .catch(err => console.log(err));
    }
  });

  const loadTweets = function () {
    return $
      .ajax({
        url: '/tweets',
        method: "GET",
      })
      .then((tweets) => {
        renderTweets(tweets);
      });
  };
  loadTweets();

  // Nav bar click to focus on text area
  $('#navCompose')
    .css('cursor', 'pointer')
    .click(function () {
      $('#tweet-text').focus();
    });
});
