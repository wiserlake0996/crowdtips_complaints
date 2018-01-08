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
    return (
        <div id="rightsidebaro">
        
        <div id="header"><h1>I hate the MTA!</h1></div>
        <div id="valueproposition"><h3>Do you agree? if yes, drop your complains here  and we will send it to the MTA on behalf of you!</h3></div>
        <div id="train"><h1>Select a train station</h1></div>  
        {/* <span className="progress-step">Step {this.props.currStep}</span>
        <progress className="progress" style={style}></progress> */}
        <div id="trainlines">
            <div defaultValue = "1" onClick={(e) => this.saveAndContinue(e, "1", "red")} ref = "1" className="lines red"><h2  defaultValue = "1">1</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "2", "red")} ref = "2"  className="lines red"><h2>2</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "3","red")} ref = "3"  className="lines red"><h2>3</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "4","green")} ref = "4"  className="lines green"><h2>4</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "5","green")} ref = "5"  className="lines green"><h2>5</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "6","green")} ref = "6"  className="lines green"><h2>6</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "7","purple")} ref = "7"  className="lines purple"><h2>7</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "a","blue")} ref = "a"  className="lines blue"><h2>A</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "c","blue")} ref = "c"  className="lines blue"><h2>C</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "e","blue")} ref = "e"  className="lines blue"><h2>E</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "b", "orange")} ref = "b"  className="lines orange"><h2>B</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "d","orange")} ref = "d"  className="lines orange"><h2>D</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "f","orange")} ref = "f"  className="lines orange"><h2>F</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "m","orange")} ref = "m"  className="lines orange"><h2>M</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "g","light_green")} ref = "g"  className="lines lightgreen"><h2>G</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "j","brown")} ref = "j"  className="lines brown"><h2>J</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "z","brown")} ref = "z"  className="lines brown"><h2>Z</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "l","light_gray")} ref = "l"  className="lines lightgray"><h2>L</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "s","dark_gray")} ref = "s"  className="lines darkgray"><h2>S</h2></div>
            <div onClick={(e) => {/*this.saveAndContinue(e, "t","another_blue")*/alert("Data not available for line!")}} ref = "t"  className="lines anotherblue"><h2>T</h2></div>

            <div onClick={(e) => this.saveAndContinue(e, "n","yellow")} ref = "n"  className="lines yellow"><h2>N</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "q","yellow")} ref = "q"  className="lines yellow"><h2>Q</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "r","yellow")} ref = "r"  className="lines yellow"><h2>R</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "w","yellow")} ref = "w"  className="lines yellow"><h2>W</h2></div>
        </div>
        
        <div id="footer"> &copy;  Crowdtips 2018</div>

    </div>
    );
  }
}

export default SelectLine;
