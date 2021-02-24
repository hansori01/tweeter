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

  // $("textarea")
  // .each(function () {
  //   this.setAttribute("style", `${this.scrollHeight}px; overflow-y:hidden;`);
  // })
  // .on("input", function () {
  //   this.style.height = "auto";
  //   this.style.height = `${this.scrollHeight}px`;
  // });

});

//JQuery feature: console.log(this) logs the current html element.