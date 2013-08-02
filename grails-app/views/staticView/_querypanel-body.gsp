<div id="query-panel">
<div class="qform">
<div title="Hide panel" class="x-close" id="panel-hide">x</div>
<form class="form-horizontal" id="search_form">
  <g:render template="distance-small-control-group" />
  <g:render template="day-control-group" />

  <div class="control-group">
    <label class="control-label" for="location">Location</label>
    <div class="map-search controls">
    <input class="ms-input" type="text" id="location" name="location" placeholder="Enter Location (or click map):"/>
    <a id="findspp-clear" class="btn-clear-search">clear</a>
    </div>
  </div>
  <div class="control-group">
    <div class="controls">
      <button type="submit" class="btn btn-primary"><i class="icon-search icon-white"></i> search</button>
    </div>
  </div>
  <input name="lat" id="lat" class="span2" type="hidden">
  <input name="lng" id="lng" class="span2"  type="hidden">
  <input type="hidden" name="includeProvisional" value="true">
  <input type="hidden" name="hotspot" value="false">
</form>
</div>
<div class="balogo">
  <img src="img/balogo120.png" alt="balogo">
</div>
<div class="eblink"> powered by
  <div class="ebird-logo"><a href="http://ebird.org" class="ebird-logo" target="_blank"><span class="ebgreen">e</span>Bird</a></div>
</div>
</div>