import React, { Component } from 'react';

class FeedbackInput extends Component{


    render(){
        return(
            <div>

                <div id="header">
                    <h1> Tell us more about your complaint / commendation  </h1>
                </div>

                 <div id="valueproposition">
                    <h3> Which emoji best expresses how you feel? </h3>
                </div>
                <div>
                    <img src="https://blameitonchocolate.files.wordpress.com/2017/04/happiness.png?w=100&h=100"/>
                    <img src="https://blameitonchocolate.files.wordpress.com/2017/04/steamfromnose.png?w=100&h=100"/>
                    <img src="https://static1.squarespace.com/static/5237604ce4b0e51f969029ae/t/5a441740c830257df7d1f335/1514412147296/?format=100w"/>
                    <img src="https://blameitonchocolate.files.wordpress.com/2017/04/neutral.png?w=100&h=100"/>
                </div>
                
                <div id="valueproposition">
                    <h3> Are there any additional details about [COMPLAINT POINT] you would like to add? </h3>
                </div>

                <textarea placeholder="complaint text here.."rows="10" id="complaint-text-area" ref="text"></textarea>
                 
            </div>
        )
    }
}


export default FeedbackInput;