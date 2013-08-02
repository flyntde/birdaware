var query_ebird = function(options) {
  var map;
  var search_form = $('#search_form');

  function initMapSpp() {
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

      changePlace(map, place.geometry.location, options.lat, options.lng);
      search_form.trigger('submit');
    });

    google.maps.event.addListener(map, 'click', function(event) {
      changePlace(map, event.latLng, options.lat, options.lng);
      search_form.trigger('submit');
    });
  }

  google.maps.event.addDomListener(window, 'load', initMapSpp);

  // ability to remove all markers
  var markersArray = [];
  google.maps.Map.prototype.clearMarkers = function() {
    for (var i = 0; i < markersArray.length; i++ ) {
      markersArray[i].setMap(null);
    }
  };

  var eBirdObsGeoSppRecent = {

    init: function(config, query) {
      this.url = config.url;
      this.params = query;
      var data = $.parseQuery(query);
      this.fetch();
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
      this.searchEbird().done(function(results) {
        $.each(results, function(index, val) {
          var myLatLng = new google.maps.LatLng(val.lat, val.lng);

          var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: val.comName + ": " + val.obsDt
          });

          var infowindow = new google.maps.InfoWindow( {
            content: "<p><strong>" + val.comName + "</strong></p>" +
            "<p> date & time: " + val.obsDt +"</p>" +
            "<p> how many: " + val.howMany + "</p>" +
            "<p> location: " + val.locName + "</p>" +
            "<p> reviewed?: " + val.obsReviewed + "</p>" +
            "<p> valid?: " + val.obsValid + "</p>"
          });

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
          });

          markersArray.push(marker);
        });
      });
    }
  };

  textclear($('#sci'), $('#findspp-clear'));
  textclear($('#location'), $('#loc-clear'));

  var getSpp = function(query) {
    return $.ajax({
      url: 'species/getSpp',
      type: 'GET',
      data: {name : query},
      dataType: 'jsonp',
      async: false
    });
  };

  $('.typeahead').typeahead({
    source: function (query, process) {
      var data = [];
      getSpp(query)
      .done(function(results) {
        $.each(results, function(index, val) {
          data.push(val);
        });
        process(data);
      })
      .fail(function(results, status, err) {
        console.log(results.statusText);
        console.log(results.responseText);
        console.log(results.status);
        console.log(status);
        console.log(err);
      });
    },
    items: 30,
    minLength: 3
  });


  // submit form input.
  search_form.on('submit', function(e) {
    if ($('#location').val() === '' && $('#lat').val() === '') {
      alert('Enter location or click on map');
      return;
    }

    var fields = $(this).serializeArray();
    var query = '';
    $.each(fields, function(i, field) {
      if (field.name === 'sci') {
        var sppArr = $('#sci').val().split(' - ');
        field.value = sppArr[1];
      }
      var param = field.name + '=' + field.value;
      if (field.name !== 'location') {
        query += (i === 0) ? param : '&' + param;
      }

    });

    query += '&includeProvisional=true&hotspot=false&fmt=json';
    eBirdObsGeoSppRecent.init(options, query);
    e.preventDefault();
  });
};