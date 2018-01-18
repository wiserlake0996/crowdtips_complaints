import React, { Component } from 'react';

class FeedbackDataPoints extends Component{

    constructor(props){
        super(props)

        this.saveAndContinue = this.saveAndContinue.bind(this)
        this.saveAndShowOtherPage = this.saveAndShowOtherPage.bind(this)
    }
   
   
    saveAndContinue(e, data) {
        e.preventDefault()

        console.log(data)
        var out ={
            complaintReason: data
        }
        this.props.setFeedbackReason(data)
        this.props.saveValues(out)
        this.props.nextStep()
    }

    saveAndShowOtherPage(e, data){
        var out ={
            complaintReason: data
        }
        this.props.setFeedbackReason(data)
        this.props.saveValues(out)

        this.props.openStep(6)
    }

    render(){
        var bgColor = {
            backgroundColor: this.props.baseColor,
        }

        var display = commendationData.map(function(item){
            var camelCase = item.value.toUpperCase();

            if(item.value == "other"){
                return(
                    <div key = {item.value} style={bgColor} onClick={(e) => this.saveAndShowOtherPage(e, item.value)} className="hatepoint"><h3>{camelCase}</h3></div>
                )
            }
            return(
                <div key = {item.value} style={bgColor} onClick={(e) => this.saveAndContinue(e, item.value)} className="hatepoint"><h3>{camelCase}</h3></div>
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
        value:'tickets'
    },
    {
        value:'safety'
    },
    {
        value:'sanitation'
    },
    {
        value:'other'
    }
]

