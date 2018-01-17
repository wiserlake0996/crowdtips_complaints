import React, { Component } from 'react';

class FeedbackDataPoints extends Component{


    render(){
        return(
            <div>
                <div id="header">
                    <h1> Complaint / Commendation about  </h1>
                </div>
                
                <div id="valueproposition">
                    <h3> What will you like to complain / give commendation to the MTA about? </h3>
                </div>

                <div id="complain">  
                    <h1 style={{textAlign:"center"}}> Select below: </h1>
                </div>

                <div id="complaints">
                    <div className="hatepoint">
                        <h3> Commend </h3>
                    </div>               
                    <div className="hatepoint">
                        <h3> Complain about</h3>
                    </div> 
                </div>         

                <div id="complain">  
                    <h1  style={{textAlign:"center", marginTop:"140px"}}> The MTA! </h1>
                </div>       
            </div>
        )
    }
}

export default FeedbackDataPoints;

var complaintsData = [
    {

    }
]

var commendationData = [
    {
        value:'delays'
    },
    {
        value:'staff'
    },
    {
        value:'ticket machines'
    },
    {
        value:'safety'
    },
    {
        value:'cleanliness'
    },
    {
        value:'other'
    }
]

            <div style={bgColor} onClick={(e) => this.saveAndContinue(e, "delays")} className="hatepoint"><h3>Delays</h3></div>
            <div style={bgColor} onClick={(e) => this.saveAndContinue(e, "staff")} className="hatepoint"><h3>Staff</h3></div>
            <div style={bgColor} onClick={(e) => this.saveAndContinue(e, "tickets")} className="hatepoint"><h3>Tickets</h3></div>
            <div style={bgColor} onClick={(e) => this.saveAndContinue(e, "dirtyness")} className="hatepoint"><h3>Dirtyness</h3></div>
            <div style={bgColor} onClick={(e) => this.saveAndContinue(e, "security")} className="hatepoint"><h3>Security</h3></div>
            <div style={bgColor} onClick={(e) => this.saveAndShowOtherPage(e, "other")} className="hatepoint"><h3>Other</h3></div>