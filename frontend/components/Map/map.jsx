import React, { Component } from 'react';

class Gmap extends React.Component {
    constructor(props) {
        super(props);
        var map;
        var markers = new Map();
        var markerCluster;
        var displayMarkers = false;
        var clusterImagePath = { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' };
        const cityLevelZoom = 10;
        var chicago = { lat: 41.850033, lng: -87.6500523 };
        var chicago1 = { lat: 41.850133, lng: -87.6501523 };
        var chicago2 = { lat: 41.850233, lng: -87.6502523 };
        var chicago3 = { lat: 41.850333, lng: -87.6503523 };
        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: chicago,
                zoom: 5
            });
            var marker = new google.maps.Marker({
                position: chicago,
                map: map
            });
            markers.set('1', marker);
            var marker1 = new google.maps.Marker({
                position: chicago1,
                map: map
            });
            markers.set('2', marker1);
            var marker2 = new google.maps.Marker({
                position: chicago2,
                map: map
            });
            markers.set('3', marker2);
            var marker3 = new google.maps.Marker({
                position: chicago3,
                map: map
            });
            markers.set('4', marker3);
            markerCluster = new MarkerClusterer(map, [], clusterImagePath);
            for (var marker of markers.values()) {
                markerCluster.addMarker(marker);
            }
            map.addListener('bounds_changed', boundChanged);
        }
        function boundChanged() {
            var bounds = map.getBounds();
            if (map.getZoom() >= cityLevelZoom) {
                drawMarkers(bounds, !displayMarkers);
                displayMarkers = true;
            } else {
                if (displayMarkers == true) {
                    clearMarkers();
                }
                displayMarkers = false;
            }
        }

        function convertMarkersToMap(m) {
            //var markers = JSON.parse(m);

            return new Map();
        }

        function drawMarkers(bounds, reIntiMarkerCluster) {
            // get a new list of markers that is within current bounds
            var newm = [];
            var newMarkers = convertMarkersToMap(newm);

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
                    markerCluster.addMarker(marker);
                }
            }
            markerCluster.repaint();

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

    }

    render() {
        return (
            <div>
                <div id="map"></div>
            </div>
        );
    }

}
export default Gmap;