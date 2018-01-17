import React, { Component } from 'react';

class FeedbackType extends Component{


    render(){
        return(
            <div>
                <div id="header">
                    <h1> Feedback Type </h1>
                </div>
                
                <div id="valueproposition">
                    <h3> Please select a feedback type </h3>
                </div>

                <div id="complain">  
                    <h1 style={{textAlign:"center"}}> I want to </h1>
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

export default FeedbackType;