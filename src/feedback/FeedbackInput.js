import React, { Component } from 'react';
import BubbleHearts from 'bubble-hearts'
import './feedback.css'



var $ = require("jquery");
class FeedbackInput extends Component{

    constructor(props){
        super(props)

        this.emojiTaps = {
            happy:0,
            angry:0,
            sick:0,
            neutral:0,
            fear:0,
            thumbs_up:0
        }

        this.registerTap = this.registerTap.bind(this)
        this.saveAndContinue = this.saveAndContinue.bind(this)
        this.submitComplaint = this.submitComplaint.bind(this)
        this.setupFloatingImage = this.setupFloatingImage.bind(this)
        this.ripples = this.ripples.bind(this)

        this.stage = new BubbleHearts()
    }

    componentDidMount(){
        this.setupFloatingImage()
        this.ripples()
    }

    registerTap(e, data){
        e.preventDefault()

        if (data in this.emojiTaps){
            this.emojiTaps[data] = this.emojiTaps[data] + 1
        }
        console.log("Emoji taps", this.emojiTaps)
        let image = new Image;
        image.onload = () => {
        this.stage.bubble(image);
    };
    var rand = Math.floor(Math.random() * 3)
        image.src = this.assets[rand];
     }

    saveAndContinue() {
        var out ={

            emoji_taps: this.emojiTaps,
            text:this.refs.text.value || ""
        }
        this.props.saveValues(out)
    }

    submitComplaint(e){
        e.preventDefault()
        this.saveAndContinue()
        this.props.submitData()
    }


    setupFloatingImage(){


         this.assets = [
            'http://localhost:3000/bubbles/like01.png',
            'http://localhost:3000/bubbles/like02.png',
            'http://localhost:3000/bubbles/like03.png',
        ];

        console.log(this.stage)
        let canvas = this.stage.canvas;
        let context = this.stage.context;
        canvas.width = 200;
        canvas.height = 200;
        canvas.style['width'] = '100%';
        canvas.style['height'] = '70px';
        
        document.getElementById('valueprop').appendChild(canvas)
    }

    ripples(){
        
        $("#emoji-canvas").click(function (e) {

  
  // Remove any old one
  $(".ripple").remove();

  // Setup
  var posX = $(this).offset().left,
      posY = $(this).offset().top,
      buttonWidth = $(this).width(),
      buttonHeight =  $(this).height();
  
  // Add the element
  $(this).prepend("<span class='ripple'></span>");

  
 // Make it round!
  if(buttonWidth >= buttonHeight) {
    buttonHeight = buttonWidth;
  } else {
    buttonWidth = buttonHeight; 
  }
  
  // Get the center of the element
  var x = e.pageX - posX - buttonWidth / 2;
  var y = e.pageY - posY - buttonHeight / 2;

  console.log("client",e.clientX)
  
 
  // Add the ripples CSS and start the animation
  $(".ripple").css({
    width: buttonWidth,
    height: buttonHeight,
    top:e.clientY-120/* top: window.myScreenWidth/6*/ + 'px',
    left: x + 'px'
  }).addClass("rippleEffect");
});
    }


    render(){

        return(
            <div>

                <div id="header">
                    <h1> Tell us more about your complaint / commendation  </h1>
                </div>

                 <div id="valueprop">
                    <h4> Which emoji best expresses how you feel? indicate severity by tapping any as much as you like </h4>
                </div>
                <div id="emoji-canvas">
                    <a className="emoji-icon dot pulse" href="" onClick={(e) => {this.registerTap(e, "happy"); }}><img style={{width:"16%", height:"60px"}} src="https://blameitonchocolate.files.wordpress.com/2017/04/happiness.png?w=100&h=100"/></a>
                    <a className="emoji-icon" href="" onClick={(e) => this.registerTap(e, "angry")}><img style={{width:"16%", height:"60px"}}src="https://blameitonchocolate.files.wordpress.com/2017/04/steamfromnose.png?w=100&h=100"/></a>
                    <a className="emoji-icon" href="" onClick={(e) => this.registerTap(e, "sick")}><img style={{width:"16%", height:"60px"}}src="https://static1.squarespace.com/static/5237604ce4b0e51f969029ae/t/5a441740c830257df7d1f335/1514412147296/?format=100w"/></a>
                    <a className="emoji-icon" href="" onClick={(e) => this.registerTap(e, "neutral")}><img style={{width:"16%", height:"60px"}}src="https://blameitonchocolate.files.wordpress.com/2017/04/neutral.png?w=100&h=100"/></a>
                    <a className="emoji-icon" href="" onClick={(e) => this.registerTap(e, "fear")}><img style={{width:"16%", height:"60px"}}src="http://www.hey.fr/tools/emoji/ios_emoji_face_screaming_in_fear.png"/></a>
                    <a className="emoji-icon" href="" onClick={(e) => this.registerTap(e, "thumbs_up")}><img style={{width:"16%", height:"60px"}}src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c4c4.png"/></a>
                
                </div>
                
                <div id="valueproposition">
                    <h4> Are there any additional details about [COMPLAINT POINT] you would like to add? </h4>
                </div>

                <textarea placeholder="complaint text here.."rows="10" id="complaint-text-area" ref="text"></textarea>
                <button id="submit-button" onClick={this.submitComplaint}>done</button>
                <button id="cancel-button"> cancel </button>
            </div>
        )
    }
}


export default FeedbackInput;