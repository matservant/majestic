$(document).ready(function() {

  // Populate the calendar with your Google Calendar XML feed. Make sure that
  // it ends with /public/full?alt=json
  // https://support.google.com/calendar/answer/37648?hl=en

  // var majesticCalendarUrl = 'https://www.google.com/calendar/feeds/rpsj44u6koirtq5hehkt21qs6k%40group.calendar.google.com/public/full?alt=json';

  var majesticCalendarUrl = 'https://www.google.com/calendar/feeds/majesticabilene.com_4btjp8jgfjolh4gv5e8aporjj4%40group.calendar.google.com/public/full?alt=json';
  var nplCalendarUrl      = 'https://www.google.com/calendar/feeds/majesticabilene.com_rvq0brpefpo6tigrm30f1a4pnk%40group.calendar.google.com/public/full?alt=json';

  var events = {};

  function addEvents(events) {
    var cal = $('.google-calendar').calendario({
      caldata : events,
      displayWeekAbbr : true
    }),
    $month = $('.calendar-header .month').html(cal.getMonthName()),
    $year  = $('.calendar-header .year').html(cal.getYear());

    $('.calendar-nav .next').on('click', function(e){
      e.preventDefault();
      cal.gotoNextMonth(updateMonthYear);
    });

    $('.calendar-nav .prev').on('click', function(e){
      e.preventDefault();
      cal.gotoPreviousMonth(updateMonthYear);
    });

    function updateMonthYear() {
      $month.html(cal.getMonthName());
      $year.html(cal.getYear());
    }
  }

  // Return a string for the booked div depending on the page, address, etc.
  // If the 'Where' field in GCal contains the string '173', it will put that address down
  // If it contains '181', it will mark that as booked. If both, it will mention that.
  function bookedText(majesticAddress) {
    // if 181 only
    if (majesticAddress.indexOf('181') >= 0) {
      var bookedText = '181 Booked';

      // if 181 and 173
      if (majesticAddress.indexOf('173') >= 0) {
        var bookedText = '173 &amp;<br> 181 Booked';
      }
    }

    // if 173 only
    else if (majesticAddress.indexOf('173') >= 0) {
      var bookedText = '173 Booked';
    }

    // Default
    else {
      var bookedText = 'Booked';
    }

    return bookedText;
  }

  // Calendar page
  if ($('body').hasClass('calendar')) {
    // Get list of upcoming events formatted in JSON and send to Calendario
    $.getJSON(majesticCalendarUrl, function(data) {
      $.each(data.feed.entry, function(i, item) {
        console.log(item);
        // The "Where" field
        var eventAddress = item.gd$where[0].valueString;
        // Get the date from the JSON object then format the date in a way that Calendario likes
        var eventDate = new Date(item.gd$when[0].endTime);
        // Make sure there are leading 0s on single digit numbers
        var eventDate = ('0' + (eventDate.getMonth() + 1)).slice(-2) + '-'
                      + ('0' + (eventDate.getDate()+1)).slice(-2) + '-'
                      + eventDate.getFullYear();

        events[eventDate] = '<span class="booked">' + bookedText(eventAddress) +'</span>';
      });

      addEvents(events);
    });
  }

});
