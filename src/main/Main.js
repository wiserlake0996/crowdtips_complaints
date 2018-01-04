import React, { Component } from 'react';
import './MainContent.css';
import sleep from 'await-sleep'



class Main extends Component {

    constructor(props){
        super(props);
              this.state = { map: null, isHidden: true }

              this.stationMarkers=[]

        this.addTransitMarkers = this.addTransitMarkers.bind(this)
        this.onKeyPress.bind(this)

        this.mapStyle = [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#212121"
              }
            ]
          },
          {
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#212121"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "administrative.neighborhood",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#181818"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1b1b1b"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#2c2c2c"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8a8a8a"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#373737"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#3c3c3c"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#4e4e4e"
              }
            ]
          },
          {
            "featureType": "road.local",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#3d3d3d"
              }
            ]
          }
        ]

        this.querySearch = null;
        this.subwayData = null;
        this.readTransitData = this.readTransitData.bind(this)

        this.createSearchableDB = this.createSearchableDB.bind(this)
        this.clearMapContents = this.clearMapContents.bind(this)

        this.querySearchableDB = this.querySearchableDB.bind(this)
        this.MapApi = null

        this.loadAllSubwayStops = this.loadAllSubwayStops.bind(this)

        this.toggleHidden = this.toggleHidden.bind(this)

        this.isHidden = true

    }

    componentDidMount(){
      this.startupProcess()
      document.getElementById("showall").hidden = true;

    }

    toggleHidden () {
 
      this.isHidden = !this.isHidden
    }
    

    async startupProcess(){

      var promise = new Promise(function(resolve, reject) {
        var data = this.readTransitData()
        resolve(data)

      }.bind(this));
      
      promise.then(function(val) {
        console.log("here:",val); // 1

        this.createSearchableDB(val)
        
      }.bind(this)).then(function(val) {

        this.markerOnMap()

      }.bind(this))
    }


    loadAllSubwayStops(){
      document.getElementById("showall").hidden = true;
      this.refs.pacinput.value = ""

      this.props.resetSignal()
      this.clearMapContents()
      var data = require('../data/subway-stations.json')

      //console.log(this.MapApi)
      this.addTransitMarkers(data['features'], this.GMapApi, this.map)
    }

    readTransitData(){
        var data = require('../data/subway-stations.json')
        return data
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

    onKeyPress = (e) => {
      if(e.key === 'Enter'){
          //do something
          //alert(e.target.value)
          this.clearMapContents()

          //clear map

          //search json
          var q = e.target.value
          this.querySearchableDB(q)
          

          //load new search to map
      }
  }

  clearMapContents(){
          // Sets the map on all markers in the array.
          var markers = this.stationMarkers
          var map = this.state.map
    for (var i = 0; i < this.stationMarkers.length; i++) {
      markers[i]['marker'].setMap(null);
    }

    this.stationMarkers = []
  }

  createSearchableDB(data){
    var  fulltextsearchlight = require('full-text-search-light');
    var search = new fulltextsearchlight();
    
    console.log("Adding search items..\n")
    for (var i=0; i < data['features'].length; i++){
        search.add(data['features'][i])
        //console.log(data['features'][i])
    }
    
    console.log("Added Search items:",data['features'].length, "\n")

    this.querySearch = search;
    console.log(this.querySearch)
  }

  querySearchableDB(query){
    var promise = new Promise(function(resolve, reject){
      var results = this.querySearch.search(query);
      resolve(results)
    }.bind(this))

    promise.then(function(data){
      this.addTransitMarkers(data, this.GMapApi, this.map)
      document.getElementById("showall").hidden = false;


    }.bind(this))
  }
 
  render() {

    const inputProps = {
      placeholder: 'Search for a station...',
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
  }

  if(this.props.signal == true){
    this.loadAllSubwayStops()
    
  }
    return (
        <div id="main">
            {/* <div className="header">
                <h1>Subway Complaints Aggregator..</h1>
                <h2>Post a letter to the MTA in a few clicks...</h2>
            </div> */}

            <div className="content">
            <div className="boxAndButton">
              <input ref = "pacinput" id="pac-input" className="controls" type="text" placeholder="Search Box" {...inputProps}/>
              <button className="showAllButton"id="showall"onClick={this.loadAllSubwayStops}>Show All</button>  
            </div>
                <div id="map" >
                            
                </div>

            </div>
        </div>
    );
  }
}

export default Main;