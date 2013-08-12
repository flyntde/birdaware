<html>
<head>
  <title>BirdAware Find Species</title>
  <g:render template="layout-head" />
   <style>
    .dropdown-menu {
      max-height: 270px;
      overflow-y: auto;
    }

    .typeahead {
      font-size: 16px;
    }

    #sci {
      font-size: 16px;
    }

    #query-panel {
      height: 184px;
    }

    .x-close {
      display: none;
    }
   </style>
</head>
<body>
<!-- nav bar -->
<g:render template="navbar" />
<!-- top horizontal query region -->
<g:render template="querypanel-head" />
<g:render template="day-control-group" />
  <div class="control-group">
    <label class="control-label" for="sci">Species</label>
    <div class="map-search controls">
    <input class="typeahead" type="text" id="sci" name="sci" placeholder="Enter Species:"/>
    <a id="findspp-clear" class="btn-clear-search">clear</a>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="location">Location</label>
    <div class="map-search controls">
    <input type="text" id="location" name="location" placeholder="Enter Location (or click map):"/>
    <a id="loc-clear" class="btn-clear-search">clear</a>
    </div>
  </div>
  <div class="control-group">
    <div class="controls">
      <button type="submit" class="btn btn-primary"><i class="icon-search icon-white"></i> search</button>
    </div>
  </div>
  <input name="lat" id="lat" class="span2" type="hidden">
  <input name="lng" id="lng" class="span2"  type="hidden">  
</form>
</div>
<g:render template="logo" />
</div>

<!-- content -->
<div id="page">
<div id="map-canvas"></div>
</div>
<!-- script section -->
<g:render template="defer-script" />
<script src="js/birdawarespp.min.js"></script>
<script>
(function() {
  query_ebird({
      url: 'http://ebird.org/ws1.1/data/nearest/geo_spp/recent',
      startLat: 38.7593,
      startLng: -77.0984,
      zoomLevel: 4,
      lat: $('#lat'),
      lng: $('#lng')
  });
})();
</script>

</body>
</html>