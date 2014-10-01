// ============================================================================
// Custom Google Map
// http://codyhouse.co/gem/custom-google-map/
// ============================================================================

if ($('body').hasClass('contact')) {
  // When the window has finished loading create our google map below
  google.maps.event.addDomListener(window, 'load', init);

  function init() {
    // Set google maps parameters
    var latitude  = 32.450159,
        longitude = -99.7325808,
        map_zoom = 16;

    var assetPath = '/wp-content/themes/majestic/assets/images/';

    // Google map custom marker icon w/png fallback for IE11
    var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
    var marker_url = ( is_internetExplorer11 ) ? assetPath + 'icon-map-location.png' : assetPath + 'icon-map-location.svg';

    // Define the basic color of the map, plus a value for saturation and brightness
    var main_color = '#1D8F79', // green
        saturation_value = -20,
        brightness_value = 5;

    // Style the map
    var style = [
      {
        // Set saturation for the labels
        elementType: "labels",
        stylers: [
          { saturation: saturation_value }
        ]
      },
      {
        // POI stands for point of interest. Don't show these lables
        featureType: "poi",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        // Don't show highways lables
          featureType: 'road.highway',
          elementType: 'labels',
          stylers: [
            { visibility: "off" }
          ]
        },
      {
        // Don't show local road lables
        featureType: "road.local",
        elementType: "labels.icon",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        // Don't show arterial road lables
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        // Don't show road lables
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        // Style different elements
        featureType: "transit",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "poi.government",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "poi.sport_complex",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "poi.attraction",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "poi.business",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "transit",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "transit.station",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "landscape",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]

      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      }
    ];

    // Set google map options
    var map_options = {
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: true,
        scrollwheel: false,
        streetViewControl: false,
        styles: style,
        zoom: map_zoom,
        zoomControl: false,
    }

    // Inizialize the map
    var mapContainer = $('.map__container')[0];
    var map = new google.maps.Map(mapContainer, map_options);

    // Add a custom marker to the map
    var marker = new google.maps.Marker({
      icon: marker_url,
      map: map,
      position: new google.maps.LatLng(latitude, longitude),
      visible: true,
      animation: google.maps.Animation.DROP
    });

    // Info window
    var infowindow = new google.maps.InfoWindow({
      // map: map,
      // position: new google.maps.LatLng(latitude, longitude),
      content:
        '<strong>The Majestic</strong><br>' +
        '181 Pine St.<br>' +
        'Abilene, TX 79601'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });


    // Add custom buttons for the zoom-in/zoom-out
    function CustomZoomControl(controlDiv, map) {
      // Grab the zoom elements from the DOM and insert them in the map
      var controlUIzoomIn = $('.map__zoom-in')[0];
      var controlUIzoomOut = $('.map__zoom-out')[0];
      controlDiv.appendChild(controlUIzoomIn);
      controlDiv.appendChild(controlUIzoomOut);

      // Setup the click event listeners and zoom-in or out according to the clicked element
      google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
        map.setZoom(map.getZoom()+1)
      });
      google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
        map.setZoom(map.getZoom()-1)
      });
    }

    var zoomControlDiv = document.createElement('div');
    var zoomControl = new CustomZoomControl(zoomControlDiv, map);

    // Insert the zoom div on the top left of the map
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
  }
}
