function MarkerControl(controlDiv, map) {
	controlDiv.style.padding = '5px';

	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = 'white';
	controlUI.style.borderStyle = 'solid';
	controlUI.style.borderWidth = '1px';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click to remove markers from map';
	controlDiv.appendChild(controlUI);

	var controlText = document.createElement('div');
	controlText.style.fontFamily = 'Arial,sans-serif';
	controlText.style.fontSize = '14px';
	controlText.style.paddingLeft = '4px';
	controlText.style.paddingRight = '4px';
	controlText.innerHTML = '<strong>Clear Marker</strong>';
	controlUI.appendChild(controlText);

  // remove all markers from map when this is clicked
  google.maps.event.addDomListener(controlUI, 'click', function() {
		map.clearMarkers();
  });
}

function changePlace(map, latLng, latInput, lngInput, zoomLevel) {
  latInput.val(latLng.lat());
  lngInput.val(latLng.lng());
  map.setCenter(latLng);
  if (map.getZoom() < zoomLevel)
    map.setZoom(zoomLevel);
}

function textclear(tinput, clearbtn) {
  tinput.on('keyup focusout focusin', function() {
    if (tinput.val().length > 0)
      clearbtn.addClass('non-empty');
    else
      clearbtn.removeClass('non-empty');
  });

  clearbtn.on('click',  function(e) {
    tinput.val('');
    clearbtn.removeClass('non-empty');
    tinput.select();
    e.preventDefault();
  });
}

// clear marker event
var clear_markers = $('#clear_markers');
clear_markers.on('click', function(e) {
  map.clearMarkers();
  e.preventDefault();
});


