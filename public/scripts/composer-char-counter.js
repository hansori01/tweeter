$(document).ready(function () {

  $("textarea").on('input', function () {
    let charCount = 140 - this.value.length;
    $("output").text(charCount);
    
    if (charCount < 21) {
      $("output").css('color', 'LightSalmon');
    } if (charCount < 11) {
      $("output").css('color', 'LightCoral');
    } if (charCount <1) {
      $("output").css('color', 'Red');
    }
    if (charCount >=21) {
      $("output").css('color', '');
    }
  })
});

//JQuery feature: console.log(this) logs the current html element.