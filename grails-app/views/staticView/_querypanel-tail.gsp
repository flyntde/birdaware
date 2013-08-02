  <div class="control-group">
    <label class="control-label" for="location">Location</label>
    <div class="map-search controls">
    <input class="ms-input" type="text" id="location" name="location" placeholder="Enter Location (or click map):"/>
    <a id="location-clear" class="btn-clear-search">clear</a>
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
<g:render template="logo" />
</div>