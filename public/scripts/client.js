$(document).ready(function () {

  //Counts character and changes color
  $('textarea').on('input', charCountColour);

  // loops array of tweet objects and appends each to ".messages"
  const renderTweets = function (tweets) {
    //clears pre-loaded tweets to avoid loading every submit. Better way to do this?
    $('.messages').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.messages').prepend($tweet);
    }
  };

  // individual Tweet HTML body is returned
  const createTweetElement = function (tweet) {

    //moment to update timestamp
    const timeStamp = moment(tweet.created_at).fromNow();
    const $tweet = $(`<article></article>`);
    const header = $(
      `<header>
  <div class='tweeter'>
  <span class ='profile'>
  <img src=${tweet.user.avatars}> 
  ${tweet.user.name}
  </span>
  <span class='handle'>${tweet.user.handle}</span>
  </div>
  </header>`
    );
    const safeInput = $("<div>").text(tweet.content.text);
    safeInput.addClass('tweet');
    const footer = $(
      `<footer>
  <div class ='timestamp'><p>${timeStamp}</p></div>
  <div class='interact' style="list-style-type:none">
  <i class="far fa-flag "></i>
  <i class="fas fa-retweet"></i>
  <i class="far fa-heart"></i>
  </div>       
  </footer>`
    );

    $tweet
      .append(header)
      .append(safeInput)
      .append(footer);

    return $tweet;
  };


  // user submits a tweet
  $('form').submit(function (event) {
    event.preventDefault();
    const tweetData = $(this).serialize();
    const tweetLength = $('textarea').val().length;

    //alerts thrown if length is 0 or too long
    if (tweetLength > 140) {
      $('#compose').fadeToggle(0);
      $('#me').fadeToggle(0);
      $('#long').fadeToggle(0);
      $('#error').fadeToggle(0);
    } else if (tweetLength === 0) {
      $('#compose').fadeToggle(0);
      $('#me').fadeToggle(0);
      $('#short').fadeToggle(0);
      $('#error').fadeToggle(0);
    } else {
      $.ajax({
        url: '/tweets',
        method: "POST",
        data: tweetData
      })
        .then(loadTweets)
        .then($('#compose').show(300))
        .then($('#me').show(300))
        .then($('#long').hide(0))
        .then($('#short').hide(0))
        .then($('#error').hide(0))
        .then($('textarea').val(''))
        .then($('output').text('140'))
        .catch(err => console.log(err));
    }
  });

  // Fetch tweets to display on page
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

  // Nav bar text to text area
  $('#navCompose')
    .css('cursor', 'pointer')
    .click(function () {
      $('#tweet-text').focus();
    });
});
