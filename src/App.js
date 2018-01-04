import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Main from './main/Main.js'
import Menu from './menu/Menu.js'


class App extends Component {

  constructor(props){
    super(props)

    this.state={
      selectedStation:{
        name:"No Station Selected",
        line: "No Station Selected"
      },
      signal:false
    }

    this.handleStationSelection = this.handleStationSelection.bind(this)
    this.handleShowAllButtonSelection = this.handleShowAllButtonSelection.bind(this)
  }

  handleStationSelection(selected){
    this.setState({
      selectedStation:selected
    })
  }

  handleShowAllButtonSelection(){
    this.setState({
      signal:true
    })
  }

  resetSignal(){
    this.setState({
      signal:false
    })
  }

  render() {
    return (
      <div className="App">


        <Main ref={instance => { this.mainChild = instance; }}  resetSignal = {this.resetSignal.bind(this)} signal={this.state.signal} stationSelection={this.handleStationSelection}/>
        <Menu loadFunc={() => {return this.mainChild.loadAllSubwayStations();}} showAllStations={this.handleShowAllButtonSelection} selectedStation={this.state.selectedStation}/>
      </div>
    );
  }
}

export default App;
