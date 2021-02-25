
$(document).ready(function () {

  $("textarea").on('input', charCountColour)

  //I want to resize the new tweet section when typing
  // $("textarea")
  // .each(function () {
  //   this.setAttribute("style", `${this.scrollHeight}px; overflow-y:hidden;`);
  // })
  // .on("input", function () {
  //   this.style.height = "auto";
  //   this.style.height = `${this.scrollHeight}px`;
  // });

});


// Changes characters left count and its colour as user types
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
}