import React, { Component } from 'react';


class SelectLine extends Component {

    constructor(props){
        super(props)

        this.saveAndContinue = this.saveAndContinue.bind(this)
        this.state = {
            disableDiv: false
         };
         this.disableDiv = this.disableDiv.bind(this);
         this.enableDiv = this.enableDiv.bind(this);
    }

saveAndContinue(e, data, color) {
    e.preventDefault()

    console.log(data)
    var out ={
        subway_line: data
    }
    this.props.updateLineSelection(data, color)

    this.props.saveValues(out)
    this.props.nextStep()
    }

    disableDiv() {
        this.setState({
           disableDiv:true
        });
      }
    
      enableDiv() {
        this.setState({
           disableDiv:false
        });
      }
  render() {

    var style = {
        width : (this.props.currStep / 4 * 100) + '%'
      }

      var divStyle = {
        display:this.state.disableDiv?'block':'none'
      };


      var linesDisplay = lineData.map(function(item){
        var clas = "lines "+ item.color
        if(item.value == "T"){
            return(

            <div ref = {item.value}  className={clas} onClick={(e) => {alert("Data not available for line!")}}>
                <h2>{item.value}</h2>
            </div>           
            )
        }
        return(
            <div ref = {item.value}  className={clas} onClick={(e) => this.saveAndContinue(e, item.value, item.color)}>
                <h2>{item.value}</h2>
            </div>    
        )
      }.bind(this))
    return (
        <div id="rightsidebaro">
        
        <div id="header"><h1>I hate the MTA!</h1></div>
        <div id="valueproposition"><h3>Do you agree? if yes, drop your complains here  and we will send it to the MTA on behalf of you!</h3></div>
        <div id="train"><h1>Select a train station</h1></div>  
        {/* <span className="progress-step">Step {this.props.currStep}</span>
        <progress className="progress" style={style}></progress> */}
        <div id="trainlines">
            {linesDisplay}
         </div>
        
        <div id="footer"> &copy;  Crowdtips 2018</div>

    </div>
    );
  }
}

export default SelectLine;

var lineData = [
    {
        value: "1",
        color: "red"
    },
        {
        value: "2",
        color: "red"
    },
        {
        value: "3",
        color: "red"
    },    {
        value: "4",
        color: "green"
    },    {
        value: "5",
        color: "green"
    },    {
        value: "6",
        color: "green"
    },    {
        value: "7",
        color: "purple"
    },    {
        value: "A",
        color: "blue"
    },    {
        value: "C",
        color: "blue"
    },    {
        value: "E",
        color: "blue"
    },    {
        value: "B",
        color: "orange"
    },    {
        value: "D",
        color: "orange"
    },    {
        value: "F",
        color: "orange"
    },    {
        value: "M",
        color: "orange"
    },    {
        value: "G",
        color: "light_green"
    },    {
        value: "J",
        color: "brown"
    },    {
        value: "Z",
        color: "brown"
    },    {
        value: "L",
        color: "light_gray"
    },    {
        value: "S",
        color: "dark_gray"
    },{
        value:"T",
        color:"another_blue"
    },    {
        value: "N",
        color: "yellow"
    },    {
        value: "Q",
        color: "yellow"
    },    {
        value: "R",
        color: "yellow"
    },    {
        value: "W",
        color: "yellow"
    }
]
