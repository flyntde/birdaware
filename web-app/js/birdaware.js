var nearbyRecentObservations = function(options) {
  var map;
  var search_form = $('#search_form');
  var location = $('#location');
  var locationclear = $('#location-clear');

  function initMap() {
    var centerLoc = new google.maps.LatLng(options.startLat, options.startLng);
    var mapDiv = document.getElementById('map-canvas');
    var mapOptions = {
      center: centerLoc,
      zoom: options.zoomLevel,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    map = new google.maps.Map(mapDiv, mapOptions);

    // Create the DIV to hold the control and call the HomeControl() constructor
    // passing in this DIV.
    var markerControlDiv = document.createElement('div');
    var markerControl = new MarkerControl(markerControlDiv, map);

    markerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(markerControlDiv);

    var input = document.getElementById('location');
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.bindTo('bounds', map);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      input.className = '';
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        input.className = 'not found';
        return;
      }

      changePlace(map, place.geometry.location, options.lat, options.lng, options.adjustZoomLevel);
      search_form.trigger('submit');
      updateCircle(place.geometry.location);
    });

    google.maps.event.addListener(map, 'click', function(event) {
      changePlace(map, event.latLng, options.lat, options.lng, options.adjustZoomLevel);
      updateCircle(event.latLng);
      locationclear.trigger('click');
      search_form.trigger('submit');
    });
  }
  google.maps.event.addDomListener(window, 'load', initMap);

  var circle;
  var dist_input = $('#dist');
  var updateCircle = function(latLng) {
    if (circle) circle.setMap(null);

    var circleOpts = {
    center: latLng,
    fillColor: '#700000',
    fillOpacity: 0.2,
    map: map,
    radius: dist_input.val() * 1000,
    strokeWeight: 1,
    clickable: false,
    draggable: false
    };
    circle = new google.maps.Circle(circleOpts);
  };

  var eBirdObsGeoRecent = {

    init: function(config, query, updateCircle) {
      this.url = config.url;
      this.params = query;
      this.template = config.template;
      this.container = config.container;
      var data = $.parseQuery(query);
      this.latLng = new google.maps.LatLng(data.lat, data.lng);
      updateCircle(this.latLng);
      this.fetch();
    },

    attachTemplate: function() {
      var template = Handlebars.compile(this.template);
      this.container.html(template(this.sightings));

      $('#sightings').click('a', function(e) {
        var queryString = $(e.target).attr('href');
        var data = $.parseQuery(queryString);

        var myLatLng = new google.maps.LatLng(data.lat, data.lng);

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          icon: 'images/bamarker2.png',
          title: data.comName + ": " + data.obsDt
        });

        var infowindow = new google.maps.InfoWindow( {
          content: "<p><strong>" + data.comName + "</strong></p>" +
          "<p> date & time: " + data.obsDt +"</p>" +
          "<p> how many: " + data.howMany + "</p>" +
          "<p> location: " + data.locName + "</p>" +
          "<p> reviewed?: " + data.obsReviewed + "</p>" +
          "<p> valid?: " + data.obsValid + "</p>"
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });

        markersArray.push(marker);

        e.preventDefault();
      });
    },

    searchEbird: function() {
      return $.ajax({
        url: this.url,
        data: this.params,
        dataType:'jsonp'
      }).promise();
    },

    fetch: function() {
      var self = this;
      $('#ajax-loader').css('display', 'inline');
      this.searchEbird().done(function(results) {
        self.sightings = $.map(results, function(val, index) {

          return {
            comName: val.comName,
            sciName: val.sciName,
            howMany: val.howMany,
            lat: val.lat,
            lng: val.lng,
            locName: val.locName,
            obsDt: val.obsDt,
            obsReviewed: val.obsReviewed,
            obsValid: val.obsValid
          };
        });

        $('#ajax-loader').css('display', 'none');
        self.attachTemplate();
      });
    }
  };


  // ability to remove all markers
  var markersArray = [];
  google.maps.Map.prototype.clearMarkers = function() {
    for (var i = 0; i < markersArray.length; i++ ) {
      markersArray[i].setMap(null);
    }
  };

  // submit form input.
  search_form.on('submit', function(e) {
    if (location.val() === '' && $('#lat').val() === '') {
      alert('Enter location or click on map');
      return;
    }
    var query = $(this).serialize() + '&fmt=json';
    eBirdObsGeoRecent.init(options, query, updateCircle);
    e.preventDefault();
  });

  // variables to reduce DOM searching
  var panel_hide = $('#panel-hide');
  var query_panel = $('#query-panel');
  var show_panel = $('#show-panel');
  var sightings_content_inner = $('.sightings-content-inner');

  // slide query panel up or down
  panel_hide.on('click', function(e){
    query_panel.slideToggle("fast");
    show_panel.addClass('arrow-down');
    sightings_content_inner.height('80%');
    e.preventDefault();
  });


  show_panel.click(function(e){
    query_panel.slideToggle("fast");
    show_panel.removeClass('arrow-down');
    sightings_content_inner.height('70%');
    e.preventDefault();
  });



  textclear(location, locationclear);
};