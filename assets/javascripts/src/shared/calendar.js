$(document).ready(function() {

  // Populate the calendar with your Google Calendar XML feed. Make sure that
  // it ends with /public/full?alt=json
  // https://support.google.com/calendar/answer/37648?hl=en

  // var majesticCalendarUrl = 'https://www.google.com/calendar/feeds/rpsj44u6koirtq5hehkt21qs6k%40group.calendar.google.com/public/full?alt=json';

  // Majestitest
  var majesticCalendarUrl = 'https://www.google.com/calendar/feeds/e2lc6fnqe0s693pg9mdo92ot2g%40group.calendar.google.com/public/full?alt=json';
  var nplCalendarUrl      = 'https://www.google.com/calendar/feeds/5u36rt092iis6lanmr1emoqi08%40group.calendar.google.com/public/full?alt=json';

  if ($('body').hasClass('calendar')) {

    // Add events to Calendario
    // -------------------------------------------------------------------------

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

    // Create string for booked block
    // -------------------------------------------------------------------------

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

    // Combine both JSON data feeds
    // -------------------------------------------------------------------------

    var JSONData = { count: 0,
      value : {
        description: "Calendars for The Majestic",
        generator: "StackOverflow communal coding",
        calendars: []
      }
    };

    var urllist = [
      majesticCalendarUrl,
      nplCalendarUrl
    ];

    urllist.forEach(function addFeed(url) {
      $.getJSON(url, complete);
    });

    function complete(result, status, jqXHR) {
      // Track the number of calls completed back, we're not done until all 3
      // asynchronous calls have returned
      if (typeof complete.count === 'undefined') {
        complete.count = urllist.length;
      }

      if (!result.feed.entry) {
        console.log("No entries from ");
      }
      else {
        JSONData.count += result.feed.entry.length;
        JSONData.value.calendars = JSONData.value.calendars.concat(result);
      }

      // If all is well
      if (!(--complete.count)) {
        $.each(JSONData.value.calendars, function(i, calendarData) {
          // Get the name of the calendar
          calendarName = calendarData.feed.title.$t;

          $.each(calendarData.feed.entry, function(i, item) {
            // Get the event address
            var eventAddress = item.gd$where[0].valueString;

            // Get the date from the JSON object then format the date
            // in a way that Calendario likes
            var eventDate = new Date(item.gd$when[0].endTime);
            var eventDate = ('0' + (eventDate.getMonth() + 1)).slice(-2) + '-'
                          + ('0' + (eventDate.getDate()+1)).slice(-2) + '-'
                          + eventDate.getFullYear();

            var eventTag = '<span class="booked booked-' + calendarName.toLowerCase() +'">' + bookedText(eventAddress) +'</span>'

            // Go through the events that we have so far. If the current eventDate
            // is the same as one of the date keys we've already added to the object,
            // append the new span to the exisitng one.
            for (keyDate in events) {
              if (keyDate == eventDate) {
                eventTag = events[keyDate] + eventTag;
              }
            }

            // Add the date and events to the object
            events[eventDate] = eventTag;
          });

          // Now send our nicely formatted object to Calendario
          addEvents(events);
        });
      }
    }

  }

  // NPL page
  // ---------------------------------------------------------------------------

  if ($('body').hasClass('neon-parrot-lounge')) {

    // Get list of upcoming events formatted in JSON and send to Calendario
    $.getJSON(nplCalendarUrl, function(data) {

      $.each(data.feed.entry, function(i, item) {

        // Get start and end time objects
        var dateToday = new Date();
        var dateStart = new Date(item.gd$when[0].startTime);
        var dateEnd   = new Date(item.gd$when[0].endTime);

        // Create friendly date string
        var eventDate = $.format.date(dateStart, "ddd, MMM D");

        // How many days until event?
        var day = 1000 * 60 * 60 * 24;
        var daysUntilEvent = Math.ceil((dateEnd.getTime() - dateToday.getTime()) / (day));

        // Get a pretty date (Today, Tomorrow, 6 days, etc.)
        if (daysUntilEvent == 0) {
          prettyDate = "Today";
        } else if (daysUntilEvent == 1) {
          prettyDate = "Tomorrow";
        } else {
          prettyDate = null;
        }

        // Starting and ending times
        eventStart = $.format.date(dateStart, "h:mm");
        eventEnd = $.format.date(dateEnd, "h:mm");

        // AM or PM
        eventStartMarker = $.format.date(dateStart, "a");
        eventEndMarker = $.format.date(dateEnd, "a");

        // Get the event title, description, and address
        var eventTitle = item.title.$t;
        var eventDescription = item.content.$t;
        var eventAddress = item.gd$where[0].valueString;

        // Only create markup if the event hasn't happened yet
        if (daysUntilEvent >= 0) {
          var eventTemplate = $('<li class="event"></li>');

          if (eventTitle) {
            eventTemplate.append('
              <header class="event--header">
                <h3>' + eventTitle + '</h3>
              </header>
            ');
          }

          if (eventDate) {
            // Show the pretty Date if it's available
            displayDate = (prettyDate) ? prettyDate : eventDate;

            eventTemplate.append('
              <ul class="event--when">
                <li class="event--date">' + displayDate + '</li>
              </ul>
            ');
          }

          if (eventStart) {
            eventTemplate.find('.event--when').append('
              <li class="event--time">' + eventStart + '<span class="am-pm">' + eventStartMarker + '</span>&mdash;'
                                        + eventEnd + '<span class="am-pm">' + eventEndMarker + '</span></li>
            ');
          }

          if (eventDescription) {
            eventTemplate.append('
              <main class="event--description">' + eventDescription + '</main>
            ');
          }

          // Add the event to the page
          $('.events-list').append(eventTemplate);
        }

      });
    });

  }

});
