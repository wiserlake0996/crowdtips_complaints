import React, { Component } from 'react';

import './complaint.css'
class OtherComplaintBox extends Component {

  constructor(props){
    super(props)

    this.saveComplaint = this.saveComplaint.bind(this)
    this.cancelComplaint = this.cancelComplaint.bind(this)

  }

  saveComplaint(e){
    e.preventDefault()

    var text = this.refs.text.value;
    var topic = this.refs.topic.value

    var out = {
        complaintType:"other",
        complaints: {
            type:"other",
            topic: topic,
            text: text
          }

    }

    this.props.saveValues(out)
    alert("all done, thank you")
    this.props.submitData()
    
    this.props.openStep(1)


  }

  cancelComplaint(){

  }

  render(){
      return(
          <div id="other-complaint-container">
                <div id="header"><h1>I hate the MTA!</h1></div>
                <div id="valueproposition"><h3>Do you agree? if yes, drop your complains here  and we will send it to the MTA on behalf of you!</h3></div>
                <div id="complain"><h1>I want to complain about</h1></div> 
                <input placeholder="enter topic"id="topic" type="text" ref="topic"/>
                <textarea placeholder="complaint text here.."rows="10" id="complaint-text-area" ref="text"></textarea>
                <button id="submit-button" onClick={this.saveComplaint}>done</button>
                <button id="cancel-button"> cancel </button>
          </div>
      )
  }
}

export default OtherComplaintBox
