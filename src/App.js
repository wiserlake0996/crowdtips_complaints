import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SelectStation from './select_station/SelectStation'
import SelectComplaint from './select_complaint/SelectComplaint'
import ComplaintDetails from './complaint_details/ComplaintDetails'
import SelectLine from './select_line/SelectLine'

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
      selectedLine:null
    }

    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.saveValues = this.saveValues.bind(this)
    this.showStep = this.showStep.bind(this)
    this.setComplaintType = this.setComplaintType.bind(this)
    this.submitData = this.submitData.bind(this)
    this.updateLineSelection = this.updateLineSelection.bind(this)
  }

  setComplaintType(complaint){
    this.setState({
      currentComplaintType: complaint
    })
  }

  saveValues(fields) {
    return function() {
      // Remember, `fieldValues` is set at the top of this file, we are simply appending
      // to and overriding keys in `fieldValues` with the `fields` with Object.assign
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
      fieldValues = Object.assign({}, fieldValues, fields)
      console.log(fieldValues)
    }()
  }
  
  nextStep() {
    this.setState({
      step : this.state.step + 1
    })
  }
  
  // Same as nextStep, but decrementing
  previousStep() {
    this.setState({
      step : this.state.step - 1
    })
  }

  updateLineSelection(line){
    this.setState({
      selectedLine: line
    })
  }

  submitData(){
    var timeInMs = Date.now();

    var time={
      timestamp: timeInMs
    }
    fieldValues = Object.assign({}, fieldValues, time) 

    console.log(fieldValues)

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


  }

  showStep(){
    switch(this.state.step){
      case 1:
        return (<SelectLine updateLineSelection={this.updateLineSelection} currStep ={this.state.step} fieldValues={fieldValues}
        nextStep={this.nextStep}
        saveValues={this.saveValues}/>  
        )     

      case 2:
        return (<SelectStation selectedLine = {this.state.selectedLine} currStep ={this.state.step} fieldValues={fieldValues}
        nextStep={this.nextStep}
        saveValues={this.saveValues}/>
     
        )         

      case 3:
        return (<SelectComplaint setComplaint={this.setComplaintType} currStep ={this.state.step} fieldValues={fieldValues}
        nextStep={this.nextStep}
        saveValues={this.saveValues}/> 
        )     
      case 4:
        return (<ComplaintDetails complaintType={this.state.currentComplaintType} currStep ={this.state.step} fieldValues={fieldValues}
        nextStep={this.nextStep}
        saveValues={this.saveValues} submitData={this.submitData}
        /> 
        )     

      case 5:
        return (<SelectLine fieldValues={fieldValues}nextStep={this.nextStep}saveValues={this.saveValues}/>  
       
        )      
    }
  }

  render() {

    var style = {
      width : (this.state.step / 4 * 100) + '%'
    }
    return(
      <div>
        

        {this.showStep()}

        <div id="mapbody">
        <iframe src="https://maps.google.com/maps?q=the new school&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
        </iframe>
    </div> 

      </div>
    )
  }
}

export default App;
