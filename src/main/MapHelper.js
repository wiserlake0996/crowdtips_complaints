class MapHelper{

     addMarker(map, data, markerArray,){
        var MapApi = window.another;
        var infowindow = new MapApi.InfoWindow({
            content: data.name
        });

        var marker = new MapApi.Marker({
            map: map,
            position: data.geometry.location,
            title:data.name
        });
        markerArray.push(marker);

        marker.addListener('click', function(){
            infowindow.open(map, marker);

        });
    }

    removeAllMarkers(map, markerArray){
        var i;
        for (i =0; i< markerArray.length; i++){
            markerArray[i].setMap(null);
        }
    }
}

export default MapHelper;