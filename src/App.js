import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SelectStation from './select_station/SelectStation'
import SelectComplaint from './select_complaint/SelectComplaint'
import ComplaintDetails from './complaint_details/ComplaintDetails'
import SelectLine from './select_line/SelectLine'
import sleep from 'await-sleep'
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import OtherComplaintBox from './select_complaint/OtherComplaint';

var $ = require("jquery");

var firebase = require('firebase')


var fieldValues = {
  station_name     : null,
  subway_line    : null,
  complaints : [],
  timestamp      : null,
}

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      step:1,
      currentComplaintType:null,
      selectedLine:null, GoogleMapsApi:null,
      stationsGroupedByColour: {}
      
    }

    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.openStep = this.openStep.bind(this)
    this.saveValues = this.saveValues.bind(this)
    this.showStep = this.showStep.bind(this)
    this.setComplaintType = this.setComplaintType.bind(this)
    this.submitData = this.submitData.bind(this)
    this.updateLineSelection = this.updateLineSelection.bind(this)
    this.initFirebase = this.initFirebase.bind(this)
    this.writeData = this.writeData.bind(this)
    this.loadMap = this.loadMap.bind(this)
    this.loadAndGroupStationsByColour = this.loadAndGroupStationsByColour.bind(this)
    this.loadStationToMapByColor = this.loadStationToMapByColor.bind(this)
    this.clearMapContents = this.clearMapContents.bind(this)
    this.updateMapWithLine = this.updateMapWithLine.bind(this)
    this.updateSelectedStation = this.updateSelectedStation.bind(this)
    this.loadSpecificStationToMap = this.loadSpecificStationToMap.bind(this)
    this.populateMapWithAllStations = this.populateMapWithAllStations.bind(this)
    this.openContactForm = this.openContactForm.bind(this)
    this.closeContactForm = this.closeContactForm.bind(this)
    this.writeUserData = this.writeUserData.bind(this)

    this.ref = null
    this.GMapApi = null
    this.stationsGroupedByColour = {}
    this.stationMarkers=[]


  }

  componentDidMount(){
    this.initFirebase()
    this.loadMap()

    console.log("jquery", $)


  }

  async loadMap(){
    await sleep(1000)
    var MapApi = window.another;

    this.GMapApi = MapApi
    var myLatlng = {lat:40.748817, lng:-73.985428};

    var mapOptions = {
        zoom: 13,
        center: myLatlng,
        scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: mapStyle//[{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

    }
    this.GoogleApi = MapApi
    //init new map
    this.map = new MapApi.Map(document.getElementById("mapbody"), mapOptions);

    this.setState({map:this.map, GoogleMapsApi: MapApi})

    this.loadAndGroupStationsByColour()

    this.populateMapWithAllStations()

  }

  populateMapWithAllStations(){

    this.clearMapContents()

    this.loadStationToMapByColor("red")
    this.loadStationToMapByColor("brown")
    this.loadStationToMapByColor("green")
    this.loadStationToMapByColor("light_gray")
    this.loadStationToMapByColor("dark_gray")
    this.loadStationToMapByColor("blue")
    this.loadStationToMapByColor("yellow")
    this.loadStationToMapByColor("light_green")
    this.loadStationToMapByColor("green")

    this.loadStationToMapByColor("purple")
  }



  loadAndGroupStationsByColour(){
    var stationColors = {
      blue:[],
      orange:[],
      light_green:[],
      brown:[],
      light_gray:[],
      dark_gray:[],
      yellow:[],
      red:[],
      green:[],
      purple:[]
    }

    var data = require('./data/subway-stations.json')
    var stationData = data['features']

    for(var i=0; i<stationData.length; i++){
      var line = stationData[i]["properties"]["line"]
      var lineSplit = line.split("-")

      if(/^[a-zA-Z]+$/.test(lineSplit[0])){
        if(lineSplit[0] == "A" || lineSplit[0] == "C" || lineSplit[0] == "E"){
          stationColors["blue"].push(stationData[i])
        }else if(lineSplit[0] == "B" || lineSplit[0] == "D" || lineSplit[0] == "F" || lineSplit[0] == "M"){
          stationColors["orange"].push(stationData[i])
        }else if(lineSplit[0] == "S"){
          stationColors["dark_gray"].push(stationData[i])
        }else if(lineSplit[0] == "N" || lineSplit[0] == "Q" || lineSplit[0] == "R" || lineSplit[0] == "W"){
          stationColors["yellow"].push(stationData[i])
        }else if(lineSplit[0] == "L" ){
          stationColors["light_gray"].push(stationData[i])
        }else if(lineSplit[0] == "J" || lineSplit[0] == "Z"){
          stationColors["brown"].push(stationData[i])
        }else if(lineSplit[0] == "G"){
          stationColors["light_green"].push(stationData[i])
        }else{
          stationColors["another_blue"].push(stationData[i])

        }
      }else{
        if(lineSplit[0] == 1 || lineSplit[0] == 2 || lineSplit[0] == 3){
          stationColors["red"].push(stationData[i])
        }else if(lineSplit[0] == 4 || lineSplit[0] == 5 || lineSplit[0] == 6 ){
          stationColors["green"].push(stationData[i])
        }else if(lineSplit[0] == 7){
          stationColors["purple"].push(stationData[i])
        }
      }
    }

    this.stationsGroupedByColour = stationColors;
    this.setState({
      stationsGroupedByColour:stationColors
      
    })

    
  }

  loadStationToMapByColor(stationColor){

    //await(2000)
    var markers = []
    var MapApi = this.GoogleApi
   
    var map = this.map
    var imageUrl = 'http://localhost:3000/station_icons/'

    if(stationColor == "red"){
      imageUrl = imageUrl+"red.png"
    }
    if(stationColor == "blue"){
      imageUrl = imageUrl+"blue.png"
    }
    if(stationColor == "green"){
      imageUrl = imageUrl+"green.png"
    }
    if(stationColor == "light_green"){
      imageUrl = imageUrl+"lightgreen.png"
    }
    if(stationColor == "yellow"){
      imageUrl = imageUrl+"yellow.png"
    }
    if(stationColor == "brown"){
      imageUrl = imageUrl+"brown.png"
    }
    if(stationColor == "purple"){
      imageUrl = imageUrl+"purple.png"
    }
    if(stationColor == "orange"){
      imageUrl = imageUrl+"orange.png"
    }
    if(stationColor == "light_gray"){
      imageUrl = imageUrl+"lightgray.png"
    }
    if(stationColor == "dark_gray"){
      imageUrl = imageUrl+"darkgray.png"
    }

    if(stationColor == "another_blue"){
      imageUrl = imageUrl+"anotherblue.png"
    }
    var image = {
      url: imageUrl,
      // This marker is 20 pixels wide by 32 pixels high.
      size: new MapApi.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new MapApi.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new MapApi.Point(0, 32)
    };

    var shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };

    var infowindow = new MapApi.InfoWindow();
    var marker, i;

    var data = this.state.stationsGroupedByColour[stationColor]

    for (i = 0; i < data.length; i++) {
      var station = data[i]
      var name = station["properties"]["name"]  
      marker = new MapApi.Marker({
        position: new MapApi.LatLng(station["geometry"]["coordinates"][1], station["geometry"]["coordinates"][0]),
        map: map,
        icon:image
      });

      this.stationMarkers.push({
        name:name,
        line:station["properties"]["line"],
        marker: marker
      })

      console.log("i value:", i)
    

    
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
        infowindow.open(map, marker);
      }.bind(this)
    }.bind(this))(marker, i));

    this.setState({stationMarkers:markers})
  }
  }

  updateMapWithLine(selectedColor){
    this.clearMapContents()
    this.loadAndGroupStationsByColour()
    this.loadStationToMapByColor(selectedColor)
  }

  clearMapContents(){
    // Sets the map on all markers in the array.
    var markers = this.stationMarkers
    var map = this.map
    for (var i = 0; i < this.stationMarkers.length; i++) {
      markers[i]['marker'].setMap(null);
    }
    this.stationMarkers = []

    var myLatlng = {lat:40.748817, lng:-73.985428};

    this.map.panTo(myLatlng)
  }


  initFirebase(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBW0xY7OLHXBIWa3c5iHa2-7JP9kngBwCc",
        authDomain: "complaints-mta.firebaseapp.com",
        databaseURL: "https://complaints-mta.firebaseio.com",
        projectId: "complaints-mta",
        storageBucket: "",
        messagingSenderId: "772383984934"
    };
    firebase.initializeApp(config);
    this.ref = firebase.database().ref('complaints')
  }

  writeData(data){
    var newPostKey = firebase.database().ref().child('complaints').push().key;
    this.complaintKey = newPostKey;
    var updates = {};
    updates['/complaints/' + newPostKey] = data;
    firebase.database().ref().update(updates);
    alert("Submission Received! Thank you")
  }


  writeUserData(e){
    e.preventDefault()
    var data = {
      name: this.refs.userName.value || "",
      email: this.refs.userEmail.value || "",
      complaint_key: this.complaintKey || "none"
    }
    var newPostKey = firebase.database().ref().child('subscriptions').push().key;
    var updates = {};
    updates['/subscriptions/' + newPostKey] = data;
    firebase.database().ref().update(updates);
    this.closeContactForm()
    this.complaintKey = ""

    alert("Submission Received! Thank you")
  }


  setComplaintType(complaint){
    this.setState({
      currentComplaintType: complaint
    })
  }

  saveValues(fields) {
    return function() {

      fieldValues = Object.assign({}, fieldValues, fields)
    }()
  }
  
  nextStep() {
    this.setState({
      step : this.state.step + 1
    })
  }

  openStep(stepNumber){
    this.setState({
      step: stepNumber
    })
  }
  
  // Same as nextStep, but decrementing
  previousStep() {
    this.setState({
      step : this.state.step - 1
    })
  }

  updateLineSelection(line, color){
    this.setState({
      selectedLine: line
    })

    this.updateMapWithLine(color)
  }



  updateSelectedStation(stationData){
    var line = stationData["properties"]["line"]
    var lineSplit = line.split("-")

    if(/^[a-zA-Z]+$/.test(lineSplit[0])){
      if(lineSplit[0] == "A" || lineSplit[0] == "C" || lineSplit[0] == "E"){
        this.loadSpecificStationToMap(stationData, "blue")
      }else if(lineSplit[0] == "B" || lineSplit[0] == "D" || lineSplit[0] == "F" || lineSplit[0] == "M"){
        this.loadSpecificStationToMap(stationData, "orange")
      }else if(lineSplit[0] == "S"){
        this.loadSpecificStationToMap(stationData, "darkgray")
      }else if(lineSplit[0] == "N" || lineSplit[0] == "Q" || lineSplit[0] == "R" || lineSplit[0] == "W"){
        this.loadSpecificStationToMap(stationData, "yellow")
      }else if(lineSplit[0] == "L" ){
        this.loadSpecificStationToMap(stationData, "lightgray")
      }else if(lineSplit[0] == "J" || lineSplit[0] == "Z"){
        this.loadSpecificStationToMap(stationData, "brown")
      }else if(lineSplit[0] == "G"){
        this.loadSpecificStationToMap(stationData, "lightgreen")
      }else{
        this.loadSpecificStationToMap(stationData, "anotherblue")
        
      }
    }else{
      if(lineSplit[0] == 1 || lineSplit[0] == 2 || lineSplit[0] == 3){
        this.loadSpecificStationToMap(stationData, "red")
      }else if(lineSplit[0] == 4 || lineSplit[0] == 5 || lineSplit[0] == 6 ){
        this.loadSpecificStationToMap(stationData, "green")
      }else if(lineSplit[0] == 7){
        this.loadSpecificStationToMap(stationData, "purple")
      }
    }
  }

  loadSpecificStationToMap(stationData, lineColor){

    this.clearMapContents();

    var markers = []
    var MapApi = this.GoogleApi
   
    var map = this.map
    var imageUrl = 'http://localhost:3000/station_icons/'+lineColor+".png"

    var image = {
      url: imageUrl,
      // This marker is 20 pixels wide by 32 pixels high.
      size: new MapApi.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new MapApi.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new MapApi.Point(0, 32)
    };

    var shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };

    var infowindow = new MapApi.InfoWindow();
    var marker, i;

      var station = stationData
      var name = station["properties"]["name"]  
      marker = new MapApi.Marker({
        position: new MapApi.LatLng(station["geometry"]["coordinates"][1], station["geometry"]["coordinates"][0]),
        map: map,
        icon:image
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
        infowindow.open(map, marker);

        //this.props.stationSelection(selection)
      }.bind(this)
    }.bind(this))(marker, 0));

    var myLatlng = new MapApi.LatLng(station["geometry"]["coordinates"][1], station["geometry"]["coordinates"][0])
    this.map.setZoom(13);

    this.map.panTo(myLatlng)
    this.setState({stationMarkers:markers})

  }

  submitData(){

    this.openContactForm()
    var timeInMs = Date.now();

    var time={
      timestamp: timeInMs
    }
    fieldValues = Object.assign({}, fieldValues, time) 
    this.writeData(fieldValues)

    // WRITE TO FIREBASE
    this.setState({
      step : 1
    })

    /// RESET FIELD VALUES

    fieldValues = {
      station_name     : null,
      subway_line    : null,
      complaints : [],
      timestamp      : null,
    }


    //RESET STATES
    this.setState({
      //step:1,
      currentComplaintType:null,
      selectedLine:null
    })



    this.populateMapWithAllStations()

  }

  showStep(){
    switch(this.state.step){
      case 1:
        return (
 
        
        <SelectLine key="step1" updateLineSelection={this.updateLineSelection} currStep ={this.state.step} fieldValues={fieldValues}
        nextStep={this.nextStep}
        saveValues={this.saveValues}/>  


        )     

      case 2:
        return ( 

        <SelectStation updateSelectedStation = {this.updateSelectedStation} key="step2" selectedLine = {this.state.selectedLine} currStep ={this.state.step} fieldValues={fieldValues}
        nextStep={this.nextStep}
        saveValues={this.saveValues}/>
  
        )         

      case 3:
        return (<SelectComplaint openStep={this.openStep} key="step3" setComplaint={this.setComplaintType} currStep ={this.state.step} fieldValues={fieldValues}
        nextStep={this.nextStep}
        saveValues={this.saveValues}/> 
        )     
      case 4:
        return (<ComplaintDetails key="step4" complaintType={this.state.currentComplaintType} currStep ={this.state.step} fieldValues={fieldValues}
        nextStep={this.nextStep}
        saveValues={this.saveValues} submitData={this.submitData}
        /> 
        )     

      case 5:
        return (<SelectLine key="step5" fieldValues={fieldValues}nextStep={this.nextStep}saveValues={this.saveValues}/>  
       
        )    
        
        case 6:
        return (<OtherComplaintBox submitData={this.submitData} openStep={this.openStep}key="step6" fieldValues={fieldValues}nextStep={this.nextStep}saveValues={this.saveValues}/>  
       
        )
        
        case 7:
        return(
          <div id="contactForm">

          <h1>Keep in touch!</h1>
          <small>I'll get back to you as quickly as possible</small>
    
          <form action="#">
            <input id="contact-input" placeholder="Name" type="text" required />
            <input id="contact-input" placeholder="Email" type="email" required />
            <input id="contact-input" placeholder="Subject" type="text" required />
            <textarea id="contact-textarea" placeholder="Comment"></textarea>
            <input className="formBtn" type="submit" />
            <input className="formBtn" type="reset" />
          </form>
          </div>
        )
    }
  }

  openContactForm(){

    $("#contactForm").fadeToggle();
    
  }

  closeContactForm(){
    var container = $("#contactForm");
    container.fadeOut();
  }

  render() {

    $(document).mouseup(function (e) {
      var container = $("#contactForm");
  
      if (!container.is(e.target) // if the target of the click isn't the container...
          && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
          container.fadeOut();
      }
    });

    var style = {
      width : (this.state.step / 4 * 100) + '%'
    }
    return(
      <div id="page-container">
        <div id="contactForm">

          <h1 className="contact-form-header">Keep in touch!</h1>
          <small className="contact-form-description">Add your email below to receive a summary and updates about your complaint </small>

          <form action="#">
            <input ref="userName" id="contact-input" placeholder="Name" type="text" required />
            <input ref = "userEmail"id="contact-input" placeholder="Email" type="email" required />

            <input onClick={this.writeUserData}className="formBtn" type="submit" />
            {/* <input onClick={this.closeContactForm} value="Cancel"className="formBtn" type="reset" /> */}
          </form>
          </div>

        
        <div id="rightsidebar">


          <ReactCSSTransitionReplace
            transitionName="cross-fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={10}
          > 

            {this.showStep()}

          </ReactCSSTransitionReplace>

        </div>

        <div id="mapbody">

        </div>

      </div>
    )
  }
}


var mapStyle = [
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
export default App;
