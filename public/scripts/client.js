$(document).ready(function () {
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */

  //loops array of tweet objects and appends each to ".messages"
  const renderTweets = function (tweets) {

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.messages').prepend($tweet);
    }

  }

  // individual Tweet HTML body is returned
  const createTweetElement = function (tweet) {
    const $tweet = $(`<article></article>`)

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
    )

    const safeInput = $("<div>").text(tweet.content.text);
    safeInput.addClass('tweet')

    const footer = $(
      `<footer>
  <div class ='timestamp'><p>1s ago</p></div>
  <div class='interact' style="list-style-type:none">
  <i class="far fa-flag "></i>
  <i class="fas fa-retweet"></i>
  <i class="far fa-heart"></i>
  </div>       
  </footer>`
    )

    $tweet
      .append(header)
      .append(safeInput)
      .append(footer);

    return $tweet;
  }


  // user submits a tweet
  $('form').submit(function (event) {
    event.preventDefault();
    const tweetData = $(this).serialize();
    const tweetLength = $('textarea').val().length;

    console.log(tweetLength);
    //alerts thrown if '' or too long
    if (tweetLength > 140) {
      $('#compose').fadeToggle(0)
      $('#me').fadeToggle(0)
      $('#error').fadeToggle(300)
      $('#long').fadeToggle(300)

    } else if (tweetLength === 0) {
      $('#compose').fadeToggle(0)
      $('#me').fadeToggle(0)
      $('#short').fadeToggle(0)
      $('#error').fadeToggle(0)
      // if error message is already visible
      // run the above but with opposite.

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
        .catch(err => console.log(err))
    }
  });

  // Fetch tweets to display on page
  const loadTweets = function () {
    console.log('loading the tweets')
    return $
      .ajax({
        url: '/tweets',
        method: "GET",
      })
      .then((tweets) => {
        renderTweets(tweets);
      })
  };
  loadTweets();

  // $('article').on('mouseenter', function () {
  // // add and remove classes
  // // when the article is being hovered it addClass
  // // make mouseleave = remove class
  // });


  // Nav bar text to text area
  $('#navCompose')
    .css('cursor', 'pointer')
    .click(function () {
      $('#tweet-text').focus()
    });


});
