
// $(document).ready(function () {
//   $("textarea").on('input', charCountColour)
// });


// Counts characters left and changes colour
const charCountColour = function() {

  let charCount = 140 - this.value.length;
  $("output").text(charCount);

  if (charCount < 21) {
     $("output").css('color', 'LightSalmon');
  } if (charCount < 11) {
     $("output").css('color', 'Tomato');
  } if (charCount < 1) {
     $("output").css('color', '#8B0000');
  }
  if (charCount >= 21) {
     $("output").css('color', '');
  }
};
