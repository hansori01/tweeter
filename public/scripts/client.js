$(document).ready(function () {
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Bruno Mars",
        "avatars": "/images/profile2.png",
        "handle": "@uptown_dont_flunk"
      },
      "content": {
        "text": "I'm replacing twitter with this app!"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Ariel",
        "avatars": "/images/profile3.png",
        "handle": "@underthec"
      },
      "content": {
        "text": "What is afoot on this app?"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Violet Beauregarde",
        "avatars": "/images/profile4.png",
        "handle": "@blueberry_girl17"
      },
      "content": {
        "text": "...back on gum!"
      },
      "created_at": 1461116232227
    }
  ]

  //loops array of tweet objects and appends each to ".messages"
  const renderTweets = function (tweets) {

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.messages').append($tweet);
    }

  }

  // individual Tweet HTML body is returned
  const createTweetElement = function (tweet) {
    let $tweet = $(`<article>
    <header>
    <div class='tweeter'>
    <span class ='profile'>
    <img src=${tweet.user.avatars}> 
    ${tweet.user.name}
    </span>
    <span class='handle'>${tweet.user.handle}</span>
    </div>
    </header>
    <div class='tweet'>${tweet.content.text}<hr></div>
    <footer>
    <div class ='timestamp'><p>1s ago</p></div>
    <ul class='interact' style="list-style-type:none">
    <li id='share'>↩</li>
    <li id='flag'>☆</li>
    <li id='heart'>❤</li>
    </ul>       
    </footer>
    </article>
    `)

    return $tweet;
  }
  // appends data in hardcoded 'db' to html body.
  renderTweets(data);




// a function using ajax to post tweet to db
// target the form element in HTML
$('form').submit(event => {
  event.preventDefault();
  console.log($('textarea').val());
})
// prevent the default behavior of post request and reloading page.
//with jQuery, listen for form submission with submit handler
// use .serialize() turns form data into query string
// the serialized data is sent to server in the data field of AJAX post request.




});
