<div id="page">
  <div class="sightings-panel">
    <div title="Show panel" id="show-panel"></div>
    <img src="img/gif-load.gif" id="ajax-loader"/>
    <div class="sightings-content-inner">
      <h4>${title}</h4>
      <ul class="unstyled" id="sightings">
      <script id="obs-template" type="text/x-handlebars-template">
        {{#if this}}
        {{#each this}}
        <li><a href="?comName={{comName}}&howMany={{howMany}}&obsDt={{obsDt}}&lat={{lat}}&lng={{lng}}&locName={{locName}}&&obsReviewed={{obsReviewed}}&&obsValid={{obsValid}}">{{comName}}</a> {{obsDt}}</li>
        {{/each}}
        {{else}}
        <li>no results found</li>
        {{/if}}
      </script>
      </ul>
    </div>
  </div>
  <div id="map-canvas"></div>
</div>