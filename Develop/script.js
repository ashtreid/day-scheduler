$(document).ready(function() {
  function headingTodaysDate() {
    const todaysDate = dayjs().format("dddd | MMMM D, YYYY");
    $('#currentDay').text(todaysDate).css("fontSize", "30px");
  };

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

  function clearScheduleLocal() {
    $('.btn-danger').on('click', function() {
      localStorage.clear();
      location.reload();
    });
  };

  headingTodaysDate();
  addTimeBlocks();
  storeValsOnSave();
  clearScheduleLocal();
});