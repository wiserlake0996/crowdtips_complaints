import React, { Component } from 'react';
import './Main.css';
import sleep from 'await-sleep'



class Main extends Component {

    constructor(props){
        super(props);
              this.state = { map: null }

              this.stationMarkers=[]

        this.addTransitMarkers = this.addTransitMarkers.bind(this)

        this.mapStyle = [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8ec3b9"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1a3646"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#4b6878"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#64779e"
                }
              ]
            },
            {
              "featureType": "administrative.province",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#4b6878"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#334e87"
                }
              ]
            },
            {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#023e58"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#283d6a"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#6f9ba5"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#023e58"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3C7680"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#304a7d"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#98a5be"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#2c6675"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#255763"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#b0d5ce"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#023e58"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#98a5be"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#283d6a"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#3a4762"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#0e1626"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#4e6d70"
                }
              ]
            }
          ]
    }

    componentDidMount(){
        this.markerOnMap()
    }

    readTransitData(){
        var data = require('../data/subway-stations.json')

    }



    addTransitMarkers(data, MapApi, map){

        var markers = []

        var image = {
          url: 'http://en.xn--icne-wqa.com/images/icones/1/7/aiga-rail-transportation1.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new MapApi.Size(20, 32),
          // The origin for this image is (0, 0).
          origin: new MapApi.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new MapApi.Point(0, 32)
        };
        // Shapes define the clickable region of the icon. The type defines an HTML
        // <area> element 'poly' which traces out a polygon as a series of X,Y points.
        // The final coordinate closes the poly by connecting to the first coordinate.
        var shape = {
          coords: [1, 1, 1, 20, 18, 20, 18, 1],
          type: 'poly'
        };



    var infowindow = new MapApi.InfoWindow();

    var marker, i;

    for (i = 0; i < data.length; i++) {
        var station = data[i]
        var name = station["properties"]["name"]  
      marker = new MapApi.Marker({
        position: new MapApi.LatLng(station["geometry"]["coordinates"][1], station["geometry"]["coordinates"][0]),
        map: map
      });

      this.stationMarkers.push({
          
            name:name,
            line:station["properties"]["line"],
            marker: marker
          
      })

      MapApi.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            var content = "<div>"+
                        "<h2>"+ this.stationMarkers[i]["name"]+"</h2>"+
                        "<h4>"+ this.stationMarkers[i]["line"]+ "</h4></div>";
            var selection ={
                name:this.stationMarkers[i]["name"],
                line:this.stationMarkers[i]["line"]
            }
          infowindow.setContent(content);
          console.log(content)
          infowindow.open(map, marker);
          this.props.stationSelection(selection)
        }.bind(this)
      }.bind(this))(marker, i));
    }


    //     }

        this.setState({stationMarkers:markers})
    }
    

    async markerOnMap(){


        await sleep(1000)
        var MapApi = window.another;

        this.GMapApi = MapApi
        var myLatlng = {lat:40.748817, lng:-73.985428};

        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: this.mapStyle//[{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

        }
        //init new map
        this.map = new MapApi.Map(document.getElementById("map"), mapOptions);
        this.setState({map:this.map})


        var data = require('../data/subway-stations.json')
        this.addTransitMarkers(data["features"], MapApi, this.map)


    }
  render() {
    return (
        <div id="main">
            {/* <div className="header">
                <h1>Subway Complaints Aggregator..</h1>
                <h2>Post a letter to the MTA in a few clicks...</h2>
            </div> */}

            <div className="content">
                <div id="map" >
                            
                </div>

            </div>
        </div>
    );
  }
}

export default Main;