$(document).ready(function() {

  // Populate the calendar with your Google Calendar XML feed. Make sure that
  // it ends with /public/full?alt=json
  // https://support.google.com/calendar/answer/37648?hl=en

  // Dummy calendars
  // var majesticCalendarUrl = 'https://www.google.com/calendar/feeds/e2lc6fnqe0s693pg9mdo92ot2g%40group.calendar.google.com/public/full' + urlParams;
  // var nplCalendarUrl      = 'https://www.google.com/calendar/feeds/5u36rt092iis6lanmr1emoqi08%40group.calendar.google.com/public/full' + urlParams;

  var urlParams = '?alt=json&orderby=starttime&sortorder=ascending&futureevents=true';

  var majesticCalendarUrl = 'https://www.google.com/calendar/feeds/rpsj44u6koirtq5hehkt21qs6k%40group.calendar.google.com/public/full' + urlParams;
  var nplCalendarUrl      = 'https://www.google.com/calendar/feeds/p08apg0soacun6sv595f47njp8%40group.calendar.google.com/public/full' + urlParams;

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
            // in a way that Calendario likes (mm-dd-yyyy, e.g. '10-14-2014')
            startTime = item.gd$when[0].startTime;
            endTime = item.gd$when[0].endTime;

            eventDate = moment(startTime).format('MM-DD-YYYY');
            eventStart = moment(startTime).format('hh:mma');
            eventEnd = moment(endTime).format('hh:mma');

            var bookedClass = calendarName.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')
            var eventTag = '<span class="booked booked-' + bookedClass + '">' + bookedText(eventAddress) +'</span>'

            // Go through the events that we have so far. If the current eventDate
            // is the same as one of the date keys we've already added to the object,
            // append the new span to the exisiting one.
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
        var startTime = item.gd$when[0].startTime;
        var endTime = item.gd$when[0].endTime;

        // Create friendly date string
        var eventDate = moment(startTime).format("dddd, MMM Do");

        // Starting and ending times
        eventStart = moment(startTime).format('h:mma');
        eventEnd = moment(endTime).format('h:mma');

        // Get the event title, description, and address
        var eventTitle = item.title.$t;
        var eventDescription = item.content.$t;
        var eventAddress = item.gd$where[0].valueString;

        // Only create markup if the event hasn't happened yet
        var eventTemplate = $('<li class="event"></li>');

        function prettyDate(date) {
          moment.locale('en', {
            calendar : {
              lastDay : '[Yesterday,] MMM Do',
              sameDay : '[Today,] MMM Do',
              nextDay : '[Tomorrow,] MMM Do',
              lastWeek : '[last] dddd[,] MMM Do',
              nextWeek : '[This] dddd[,] MMM Do',
              sameElse : 'dddd[,] MMM Do'
            }
          });

          return moment(date).calendar();
        }

        if (eventTitle) {
          eventTemplate.append('
            <header class="event--header">
              <h3>' + eventTitle + '</h3>
            </header>
          ');

          if (eventDate) {
            eventTemplate.append('
              <ul class="event--when">
                <li class="event--date">' + prettyDate(startTime) + '</li>
              </ul>
            ');
          }

          if (eventStart) {
            eventTemplate.find('.event--when').append('
              <li class="event--time">' + eventStart + '&mdash;' + eventEnd + '</li>
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
