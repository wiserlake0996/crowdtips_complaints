import React, { Component } from 'react';


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
          <div>
              <input type="text" ref="topic"/>
              <textarea ref="text"></textarea>
              <button onClick={this.saveComplaint}>done</button>
              <button> cancel </button>
          </div>
      )
  }
}

export default OtherComplaintBox
