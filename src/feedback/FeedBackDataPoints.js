import React, { Component } from 'react';

class FeedbackDataPoints extends Component{


    render(){
    var bgColor = {
      backgroundColor: this.props.baseColor,

    }
        var display = commendationData.map(function(item){
            var camelCase = item.value.toUpperCase();
            return(
                <div style={bgColor} onClick={(e) => this.saveAndContinue(e, item.value)} className="hatepoint"><h3>{camelCase}</h3></div>
            )
        }.bind(this))
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
                    {display}
                </div>         
     
            </div>
        )
    }
}

export default FeedbackDataPoints;


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

