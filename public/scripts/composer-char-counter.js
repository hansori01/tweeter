$(document).ready(function () {

  $("textarea").on('input', function () {
    let charCount = 140 - this.value.length;
    $("output").text(charCount);
    if (charCount < 21) {
      $("output").css('color', 'DarkSalmon');
    } if (charCount < 11) {
      $("output").css('color', 'DarkOrange');
    } if (charCount <1) {
      $("output").css('color', 'Crimson');
    }
    if (charCount >=21) {
      $("output").css('color', '');
    }
  })
});

//JQuery feature: console.log(this) logs the current html element.