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
      }
    }

    this.handleStationSelection = this.handleStationSelection.bind(this)
  }

  handleStationSelection(selected){
    this.setState({
      selectedStation:selected
    })
  }
  render() {
    return (
      <div className="App">


        <Main stationSelection={this.handleStationSelection}/>
        <Menu selectedStation={this.state.selectedStation}/>
      </div>
    );
  }
}

export default App;
