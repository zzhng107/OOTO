var map;
		var markers = new Map();
		var businesses = new Map();
		var markerCluster;
		var displayMarkers = false;
		var inDrag = false;
		var chicago = { lat: 41.850033, lng: -87.6500523 };
		var clusterImagePath = { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' };
		const cityLevelZoom = 10;
		function initMap() {
			map = new google.maps.Map(document.getElementById('map'), {
				center: chicago,
				zoom: 5
			});
			map.addListener('bounds_changed', boundChanged);
			map.addListener('click', clearHighlight);
			map.addListener('drag', function() {
				inDrag = true;
			});
			map.addListener('dragend', function() {
				inDrag = false;
				boundChanged();
			});
			markerCluster = new MarkerClusterer(map, [], clusterImagePath);
			displayZoomInMessage();
		}
		function boundChanged() {
			if (inDrag) {
				return;
			}
			var bounds = map.getBounds();
			if (map.getZoom() >= cityLevelZoom) {
				realQueryBusinesses(bounds);
			} else {
				if (displayMarkers == true) {
					clearMarkers();
					displayZoomInMessage();
				}
				displayMarkers = false;
			}
		}

		function rendering(response, bounds) {
			if (map.getZoom() >= cityLevelZoom) {
				var parsedbusiness = JSON.parse(response);
				displayBusiness(parsedbusiness);
				drawMarkers(bounds, !displayMarkers, parsedbusiness);
				displayMarkers = true;
			} else {
				if (displayMarkers == true) {
					clearMarkers();
					displayZoomInMessage();
				}
				displayMarkers = false;
			}
		}

		function clearHighlight() {
			var panels = document.getElementById('display').getElementsByClassName('panel panel-primary');
			Array.prototype.filter.call(panels, function(panel) {
				panel.setAttribute('class', 'panel panel-default');
			});
		}

		function clearDisplay() {
			var businessDiv = document.getElementById('display');
			while (businessDiv.hasChildNodes()) {
				businessDiv.removeChild(businessDiv.lastChild);
			}
		}

		function displayZoomInMessage() {
			var businessDiv = document.getElementById('display');
			clearDisplay();
			var businessLists = document.createElement('ul');
			businessLists.setAttribute('class', 'list-group');
				var rowHeader = document.createElement('li');
				rowHeader.setAttribute('class', 'list-group-item');
				rowHeader.textContent = 'Business in current display';
				var zoomMessage = document.createElement('li');
				zoomMessage.setAttribute('class', 'list-group-item');
				zoomMessage.textContent = 'Zoom In to view businesses';
			businessLists.appendChild(rowHeader);
			businessLists.appendChild(zoomMessage);
			businessDiv.appendChild(businessLists);
		}

		function displayBusiness(parsedBusiness) {
			clearDisplay();
			var businessDiv = document.getElementById('display');
			var businessLists = document.createElement('ul');
			businessLists.setAttribute('class', 'list-group');

				var rowHeader = document.createElement('li');
				rowHeader.setAttribute('class', 'list-group-item');
				rowHeader.textContent = 'Business in current display';
			businessLists.appendChild(rowHeader);
				for (var i in parsedBusiness) {
					var row = document.createElement('li');
					row.setAttribute('class', 'list-group-item');
						var panel = document.createElement('div');
						panel.setAttribute('class', 'panel panel-default');
						panel.setAttribute('id', "bid:" + parsedBusiness[i].id);
							var entryName = document.createElement('div');
							entryName.setAttribute('class', 'panel-heading');
							entryName.textContent = parsedBusiness[i].name;
							var entryStars = document.createElement('div');
							entryStars.setAttribute('class', 'panel-body');
							entryStars.textContent = "Review stars: " + parsedBusiness[i].stars;
							var entryAddress = document.createElement('div');
							 entryAddress.setAttribute('class', 'panel-footer');
							entryAddress.textContent = parsedBusiness[i].address + ", " +  parsedBusiness[i].city;
						panel.appendChild(entryName);
						panel.appendChild(entryStars);
						panel.appendChild(entryAddress);
					row.appendChild(panel);
					businessLists.appendChild(row);
				}
			businessDiv.appendChild(businessLists);
		}

		function convertBusinessToMarkers(parsedJson) {
			var result = new Map();
			for (var i in parsedJson) {
				var id = parsedJson[i].id;
				var p = {lat: parsedJson[i].latitude, lng: parsedJson[i].longitude};
				var m = new google.maps.Marker({
					position: p,
					map: map
				});
				//m.setClickable(false);
				/*if (!markers.has(id)) {
					google.maps.event.clearListeners(m, 'click');
					m.addListener('click', function() {
						var cid = id;
						return highlightMarker(cid);
					});
				//}*/
				m.setVisible(false);
				result.set(id, m);
			}
			return result;
		}

		function realQueryBusinesses(bounds) {
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();

			var requestString = "north=" + ne.lat() + "&east=" + ne.lng() + "&south=" + sw.lat() + "&west=" + sw.lng();
			console.log(requestString);

			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					console.log(this.responseText);
					rendering(this.responseText, bounds);
				}
			};
			xhttp.open("GET", "/api/?" + requestString, true);
			xhttp.send();
		}
/*
		function queryBusinesses(bounds) {
			console.log(JSON.stringify(bounds));
			var response =
			'[ \
				{ \
					"id": "1", \
					"name": "Garaje", \
					"address": "475 3rd St", \
					"city": "Chicago", \
					"state": "IL", \
					"postal code": "94107", \
					"latitude": 41.850033, \
					"longitude": -87.6500523, \
					"stars": 4.5, \
					"review_count": 1198 \
				}, \
				{ \
					"id": "2", \
					"name": "Garaje1", \
					"address": "475 3rd St", \
					"city": "Chicago", \
					"state": "IL", \
					"postal code": "94107", \
					"latitude": 41.851033, \
					"longitude": -87.6510523, \
					"stars": 4.5, \
					"review_count": 1198 \
				}, \
				{ \
					"id": "3", \
					"name": "Garaje2", \
					"address": "475 3rd St", \
					"city": "Chicago", \
					"state": "IL", \
					"postal code": "94107", \
					"latitude": 41.852033, \
					"longitude": -87.6520523, \
					"stars": 4.5, \
					"review_count": 1198 \
				}, \
				{ \
					"id": "4", \
					"name": "Garaje3", \
					"address": "475 3rd St", \
					"city": "Chicago", \
					"state": "IL", \
					"postal code": "94107", \
					"latitude": 41.853033, \
					"longitude": -87.6530523, \
					"stars": 4.5, \
					"review_count": 1198 \
				} \
			]';
			rendering(response, bounds);
		}*/

		function highlightMarker(id) {
			clearHighlight();
			var panel = document.getElementById('bid:'+id);
			if (panel != null) {
				panel.setAttribute('class', 'panel panel-primary');
			} else {
				console.warn('marker does not have an associated panel' + id);
			}
		}

		function drawMarkers(bounds, reIntiMarkerCluster, parsedJson) {
			// get a new list of markers that is within current bounds
			var newMarkers = convertBusinessToMarkers(parsedJson);

			if (reIntiMarkerCluster) {
				markerCluster.clearMarkers();
			}

			for (var [id, marker] of markers) {
				if (!bounds.contains(marker.getPosition())) {
					marker.setVisible(false);
					markerCluster.removeMarker(marker);
					marker.setMap(null);
					markers.delete(id);
				} else if (reIntiMarkerCluster) {
					marker.setVisible(true);
					marker.setClickable(true);
					markerCluster.addMarker(marker);
				}
			}

			// add new markers into existing ones
			for (var [id, marker] of newMarkers) {
				if (!markers.has(id)) {
					markers.set(id, marker);
					marker.setVisible(true);
					markerCluster.addMarker(marker);
				}
			}
			markerCluster.repaint();

		}
		function clearMarkers() {
			for (var marker of markers.values()) {
				marker.setVisible(false);
			}
			markerCluster.clearMarkers();
		}