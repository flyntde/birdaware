<html>
<head>
  <title>BirdAware Notable Recent</title>
  <g:render template="layout-head" />
</head>
<body>
<!-- nav bar -->
<g:render template="navbar" />
<!-- top horizontal query region -->
<g:render template="querypanel-head" />
<g:render template="distance-large-control-group" />
<g:render template="day-control-group" />
<g:render template="querypanel-tail" />
<!-- content -->
<g:render template="sightings" />
<!-- script section -->
<g:render template="defer-script" />
<script src="js/birdaware.min.js"></script>
<script>
(function() {
  nearbyRecentObservations({
      url: 'http://ebird.org/ws1.1/data/notable/geo/recent',
      template: $('#obs-template').html(),
      container: $('#sightings'),
      startLat: 38.7593,
      startLng: -77.0984,
      zoomLevel: 6,
      lat: $('#lat'),
      lng: $('#lng')
  });
})();

</script>
</body>
</html>