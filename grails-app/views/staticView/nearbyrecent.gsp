<html>
<head>
  <title>BirdAware Nearby Recent</title>
  <g:render template="layout-head" />
</head>
<body>
<!-- nav bar -->
<g:render template="navbar" />
<!-- top horizontal query region -->
<g:render template="querypanel-head" />
<g:render template="distance-small-control-group" />
<g:render template="day-control-group" />
<g:render template="querypanel-tail" />
<!-- content -->
<g:render template="sightings" />
<!-- script section -->
<g:render template="defer-script" />
<script src="js/birdawareMap.js"></script>
<script src="js/birdaware.js"></script>
<script>

(function() {
    nearbyRecentObservations({
      url: 'http://ebird.org/ws1.1/data/obs/geo/recent',
      template: $('#obs-template').html(),
      container: $('#sightings'),
      startLat: 38.7593,
      startLng: -77.0984,
      zoomLevel: 6,
      adjustZoomLevel: 9,
      lat: $('#lat'),
      lng: $('#lng')
  });
})();

</script>

</body>
</html>