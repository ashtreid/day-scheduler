// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function() {
  function headingTodaysDate() {
    const todaysDate = dayjs().format("dddd | MMMM D, YYYY");
    $('#currentDay').text(todaysDate).css("fontSize", "30px");
  };
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  function storeValsOnSave() {
    $('.saveBtn').on('click', function(event) {
      event.preventDefault();

      var hourIdKey = $(this).parent().attr('id');
      var textArea = $(this).siblings('textarea').val();
      
      localStorage.setItem(hourIdKey, textArea);
    });

    $('.time-block').each(function() {
      var hourIdKey = $(this).attr('id');
      var textArea = $(this).find('textarea');
      var storedVal = localStorage.getItem(hourIdKey);

      if (storedVal === null) {
        return;
      } else {
        $(textArea).val(storedVal);
      }
    });
  };

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  function addTimeBlocks() {
    for (var i = 1; i <= 23; i++) {
      var currentHour = dayjs().hour();
      var hr = i;
      var ampm = hr >= 12 ? 'PM' : 'AM';
      var hr12 = hr % 12 || 12;
      var tense = hr < currentHour ? 'past' : (hr === currentHour ? 'present' : 'future');

      var newBlock = $('<div>').attr('id', `hour-${hr}`).addClass('row time-block' + ' ' + tense);
      var hourText = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(hr12 + ampm);
      var description = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
      var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
      var icon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');

      $(saveBtn.append(icon));
      $(newBlock.append(hourText, description, saveBtn));

      $('.container-lg').append(newBlock);
    };
  };

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  headingTodaysDate();
  addTimeBlocks();
  storeValsOnSave();
});
