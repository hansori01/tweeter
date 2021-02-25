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
    const textContent = $(this).text()
    const tweetData = $(this).serialize();
    const tweetLength = $('textarea').val().length;

    console.log(tweetLength);
    //alerts thrown if '' or too long
    if (tweetLength > 140) {
      alert('Your tweet is too long 😜')
    } else if (tweetLength === 0) {
      alert('What did you have on your mind?')
    } else {

      $.ajax({
        url: '/tweets',
        method: "POST",
        data: tweetData
      })
        .then(loadTweets())
        .then($('textarea').val(''))
        .catch(err => console.log(err))

    }
  });

  //TODO when serialized outputs title= how is it going into the object propoerly?



  // Fetch tweets to display on page
  const loadTweets = function () {
    console.log('loading the tweets')
    $.ajax({
      url: '/tweets',
      method: "GET",
    })
      .then((tweets) => {
        // console.log(tweets);
        renderTweets(tweets);
      })
  };
  loadTweets();

});
