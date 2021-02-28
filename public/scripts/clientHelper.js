
// Counts characters left and changes colour
const charCountColour = function () {
   const charCount = 140 - this.value.length;
   $('output').text(charCount);

   if (charCount < 21) {
      $('output').css('color', 'LightSalmon');
   } if (charCount < 11) {
      $('output').css('color', 'Tomato');
   } if (charCount < 1) {
      $('output').css('color', '#8B0000');
   }
   if (charCount >= 21) {
      $('output').css('color', '');
   }
};


const validateTweet = tweetLength => {
   const tooLong = tweetLength > 140;
   const isEmpty = tweetLength === 0;

   if (tooLong || isEmpty) {
      const errorMessage = tooLong ? '#long' : '#short';
      $('#compose').fadeToggle(0);
      $('#me').fadeToggle(0);
      $(errorMessage).fadeToggle(0);
      $('#error').fadeToggle(0);
      return false;
   }
   return true;
}

const resetState = () => {
   $('#compose').show(300);
   $('#me').show(300);
   $('#long').hide(0);
   $('#short').hide(0);
   $('#error').hide(0);
   $('textarea').val('');
   $('output').text('140');
}

const createTweetElement = function (tweet) {
   //using 'moment.js' to update timestamp
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