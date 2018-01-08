import React, { Component } from 'react';


class SelectComplaint extends Component {

  constructor(props){
    super(props)
    this.saveAndContinue = this.saveAndContinue.bind(this)
    this.saveAndShowOtherPage = this.saveAndShowOtherPage.bind(this)
  }

  saveAndContinue(e, data) {
    e.preventDefault()

    // Get values via this.refs

    console.log(data)
    var out ={
        complaintType: data
    }
    this.props.setComplaint(data)
    this.props.saveValues(out)
    this.props.nextStep()
  }

  saveAndShowOtherPage(e, data){
    var out ={
      complaintType: data
    }
    this.props.setComplaint(data)


    this.props.openStep(6)
  }

  render() {
    var style = {
      width : (this.props.currStep / 4 * 100) + '%'
    }
    return (
      <div id="rightsidebaro">
        
        
        <div id="header"><h1>I hate the MTA!</h1></div>
        <div id="valueproposition"><h3>Do you agree? if yes, drop your complains here  and we will send it to the MTA on behalf of you!</h3></div>
        <div id="complain"><h1>I want to complain about</h1></div> 
        {/* <span className="progress-step">Step {this.props.currStep}</span>
        <progress className="progress" style={style}></progress> */}
        <div id="complaints">
            <div onClick={(e) => this.saveAndContinue(e, "delays")} className="hatepoint"><h3>Delays</h3></div>
            <div onClick={(e) => this.saveAndContinue(e, "staff")} className="hatepoint"><h3>Staff</h3></div>
            <div onClick={(e) => this.saveAndContinue(e, "tickets")} className="hatepoint"><h3>Tickets</h3></div>
            <div onClick={(e) => this.saveAndContinue(e, "dirtyness")} className="hatepoint"><h3>Dirtyness</h3></div>
            <div onClick={(e) => this.saveAndContinue(e, "security")} className="hatepoint"><h3>Security</h3></div>
            <div onClick={(e) => this.saveAndShowOtherPage(e, "other")} className="hatepoint"><h3>Other</h3></div>
        </div>
        
        
        <div id="footer">©Crowdtips 2018</div>
    </div>
    );
  }
}

export default SelectComplaint;
