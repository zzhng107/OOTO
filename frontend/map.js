var map;
		var markers = new Map();
		var businesses = new Map();
		var markerCluster;
		var displayMarkers = false;
		var chicago = { lat: 41.850033, lng: -87.6500523 };
		var clusterImagePath = { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' };
		const cityLevelZoom = 10;
		function initMap() {
			map = new google.maps.Map(document.getElementById('map'), {
				center: chicago,
				zoom: 11
			});
			map.addListener('idle', boundChanged);
			markerCluster = new MarkerClusterer(map, [], clusterImagePath);
			displayZoomInMessage();
		}
		function boundChanged() {
			var bounds = map.getBounds();
			if (map.getZoom() >= cityLevelZoom) {
				realQueryBusinesses(bounds);
				//queryBusinesses(bounds);
			} else {
				if (displayMarkers === true) {
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
				if (displayMarkers === true) {
					clearMarkers();
					displayZoomInMessage();
				}
				displayMarkers = false;
			}
		}

		function clearHighlight() {
			let panels = document.getElementById('display').getElementsByClassName('card');
			Array.prototype.filter.call(panels, function(panel) {
				panel.setAttribute('class', 'panel panel-default');
				let title = Array.from(panel.getElementsByClassName('card-title'))[0].textContent;
				let stars = Array.from(panel.getElementsByClassName('card-text'))[0].textContent;
				var businessTitle = document.createElement('div');
				businessTitle.setAttribute('class', 'panel-body');
				businessTitle.textContent = title;
				let businessStar = document.createElement('div');
				businessStar.setAttribute('class', 'panel-footer');
				businessStar.textContent = stars;
				while (panel.hasChildNodes()) {
					panel.removeChild(panel.lastChild);
				}
				panel.appendChild(businessTitle);
				panel.appendChild(businessStar);
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
				for (let i = 0; i < parsedBusiness.length; i++) {
					var row = document.createElement('li');
					row.setAttribute('class', 'list-group-item');
						var panel = document.createElement('div');
						panel.setAttribute('class', 'panel panel-default');
						panel.setAttribute('id', "bid:" + parsedBusiness[i].pk);
						panel.business_id = parsedBusiness[i].pk;
						panel.onclick = function() {
							//console.log(this.business_id);
							clearHighlight();
							queryBusinessPreview(this.business_id, this);
                        };
							var entryName = document.createElement('div');
							entryName.setAttribute('class', 'panel-body');
							entryName.textContent = parsedBusiness[i].fields.name;
							var entryStars = document.createElement('div');
							entryStars.setAttribute('class', 'panel-footer');
							for (let j = 0; j < Math.round(Number(parsedBusiness[i].fields.stars)); j++) {
								entryStars.textContent += '\u2605';
							}
							for (let j = Math.round(Number(parsedBusiness[i].fields.stars)); j < 5; j++) {
								entryStars.textContent += '\u2606';
							}
							//entryStars.textContent = "Review stars: " + parsedBusiness[i].stars;
						panel.appendChild(entryName);
						panel.appendChild(entryStars);
					row.appendChild(panel);
					businessLists.appendChild(row);
				}
			businessDiv.appendChild(businessLists);
		}

		function convertBusinessToMarkers(parsedJson) {
			let result = new Map();
			for (let i = 0; i < parsedJson.length; i++) {
				let p = {lat: parsedJson[i].fields.latitude, lng: parsedJson[i].fields.longitude};
				const m = new google.maps.Marker({
					position: p,
					map: map
				});
				//m.setClickable(false);
				//if (!markers.has(id)) {
					google.maps.event.clearListeners(m, 'click');
					m.panel_id = parsedJson[i].pk;
					m.addListener('click', function() {
						return highlightMarker(m.panel_id);
					});
				//}
				m.setVisible(false);
				result.set(parsedJson[i].pk, m);
			}
			return result;
		}

		function realQueryBusinesses(bounds) {
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();

			var requestString = "north=" + ne.lat() + "&east=" + ne.lng() + "&south=" + sw.lat() + "&west=" + sw.lng();

			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState === 4 && this.status === 200) {
					//console.log(this.responseText);
					rendering(this.responseText, bounds);
				}
			};
			xhttp.open("GET", "/api/business/scope/?" + requestString, true);
			xhttp.send();
		}

		function queryBusinessPreview(id, panel) {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState === 4 && this.status === 200) {
					//console.log(this.responseText);
					renderingPreview(this.responseText, panel);
				}
			};
			xhttp.open("GET", "/api/business/preview/?" + "id=" + id, true);
			xhttp.send();
		}

		function renderingPreview(response, panel) {
            let parsedResponse = JSON.parse(response);
            panel.setAttribute('class', 'card');
            while (panel.hasChildNodes()) {
                panel.removeChild(panel.lastChild);
            }

            let parsedBusiness = JSON.parse(parsedResponse.Business)[0].fields;
            let parsedCategory = JSON.parse(parsedResponse.Category);
            let parsedHour = JSON.parse(parsedResponse.Hour);

            let titleBlock = document.createElement('div');
            titleBlock.setAttribute('class', 'card-block');
            let businessTitle = document.createElement('h4');
            businessTitle.setAttribute('class', 'card-title');
            businessTitle.textContent = parsedBusiness.name;
            let businessStar = document.createElement('p');
            businessStar.setAttribute('class', 'card-text');
            for (let i = 0; i < Math.round(Number(parsedBusiness.stars)); i++) {
                businessStar.textContent += '\u2605';
            }
            for (let i = Math.round(Number(parsedBusiness.stars)); i < 5; i++) {
                businessStar.textContent += '\u2606';
            }
            let businessDetail = document.createElement('a');
            businessDetail.setAttribute('href', 'business/detail/' + JSON.parse(parsedResponse.Business)[0].pk);
            businessDetail.setAttribute('class', 'btn btn-primary');
            businessDetail.textContent = 'Details';
            titleBlock.appendChild(businessTitle);
            titleBlock.appendChild(businessStar);
            titleBlock.appendChild(businessDetail);

            let businessAttributes = document.createElement('ul');
            businessAttributes.setAttribute('class', 'list-group list-group-flush');
            let businessAddress = document.createElement('li');
            businessAddress.setAttribute('class', 'list-group-item');
            businessAddress.textContent = parsedBusiness.address + ', ' + parsedBusiness.city + ', ' + parsedBusiness.state + ' - ' + parsedBusiness.postal_code;
            let businessCategory = document.createElement('li');
            businessCategory.setAttribute('class', 'list-group-item');
            for (let i = 0; i < parsedCategory.length; i++) {
            	businessCategory.appendChild(document.createTextNode(parsedCategory[i].fields.category));
            	businessCategory.appendChild(document.createElement('br'));
        	}
        	if (parsedHour.length !== 0) {
                let businessHours = document.createElement('li');
                businessHours.setAttribute('class', 'list-group-item');
                for (let i = 0; i < parsedHour.length; i++) {
            		businessHours.appendChild(document.createTextNode(parsedHour[i].fields.hours));
            		businessHours.appendChild(document.createElement('br'));
        		}
                businessAttributes.appendChild(businessHours);
            }
			businessAttributes.appendChild(businessAddress);
			businessAttributes.appendChild(businessCategory);

			panel.appendChild(titleBlock);
			panel.appendChild(businessAttributes);
		}

		function highlightMarker(id) {
			//console.log("listen id: " + id);
			clearHighlight();
			var panel = document.getElementById('bid:'+id);
			if (panel) {
				panel.setAttribute('class', 'panel panel-primary');
				panel.scrollIntoView(true);
				queryBusinessPreview(id, panel);
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
					//console.log("marker id: " + id);
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