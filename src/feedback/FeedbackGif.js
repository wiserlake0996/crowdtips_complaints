import React, { Component } from 'react';

var GphApiClient = require('giphy-js-sdk-core');
var client = GphApiClient("3ZNiY2Nn8FrUkyqVsj3wEGYd2vIKjo1G");

class FeedbackGif extends Component{

    constructor(props){
        super(props)
        this.saveAndContinue = this.saveAndContinue.bind(this)
        this.loadAppropriateImage = this.loadAppropriateImage.bind(this)
        this.getRandomInt = this.getRandomInt.bind(this)
        this.state = {
            baseImage:"https://media.giphy.com/media/rdma0nDFZMR32/giphy.gif" 
        }

    }

    componentDidMount(){
        this.loadAppropriateImage()
    }


    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }


    loadAppropriateImage(){
        var tp = this.props.fieldValues['feedback_type']
        var searchQuery = "cats"

        if (tp == "Compliment"){
            searchQuery = "good job"
        }else if(tp == "Complaint"){
            searchQuery = "bad job"
        }

        console.log("The search Query is, ", searchQuery)

        client.search('gifs', {"q": searchQuery})
        .then((response) => {

            var gifData = response.data
            var pos = this.getRandomInt(gifData.length)
            var embed = gifData[pos].images.original
            return embed.gif_url

        }).then(function(d){

            document.getElementById("gif-image").src=d;

        })
        .catch((err) => {
            console.log("ERROR: ", err)
        })
    }



    saveAndContinue(e, data){
        e.preventDefault()
        var out ={
            gif_verdict: data
        }

        this.props.saveValues(out)
        this.props.openStep(8)

        //Add data to firebase
    }

    render(){

        return(
            <div>

                <div id="header">
                    <h1> Does this Gif represent how you feel? </h1>
                </div>

                <div id="valueprop">
                    <h4> Totally Optional by the way.. </h4>
                </div>

                <div id="gif-canvas">
                    <img id="gif-image" src = "" width="90%" height="90%"/> 
                </div>

                <button ref = "yes" id="submit-button" onClick={(e) => {this.saveAndContinue(e,"yes")}}>Yay</button>
                <button ref="no" id="cancel-button"onClick={(e) => {this.saveAndContinue(e,"no")}}> Nay </button>
                <button ref="skip" id="skip-button"onClick={(e) => {this.saveAndContinue(e,"skip")}}> Skip this.. </button>


            </div>
        )
    }
}


export default FeedbackGif;