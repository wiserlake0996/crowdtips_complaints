import React, { Component } from 'react';


class SelectLine extends Component {

    constructor(props){
        super(props)

        this.saveAndContinue = this.saveAndContinue.bind(this)
    }

saveAndContinue(e, data) {
    e.preventDefault()

    // Get values via this.refs

    console.log(data)
    var out ={
        subway_line: data
    }
    this.props.updateLineSelection(data)

    this.props.saveValues(out)
    this.props.nextStep()
    }
  render() {

    var style = {
        width : (this.props.currStep / 4 * 100) + '%'
      }
    return (
        <div id="rightsidebar">
        
        <div id="header"><h1>I hate the MTA!</h1></div>
        <div id="valueproposition"><h3>Do you agree? if yes, drop your complains here  and we will send it to the MTA on behalf of you!</h3></div>
        <div id="train"><h1>Select a train station</h1></div>  
        <span className="progress-step">Step {this.props.currStep}</span>
        <progress className="progress" style={style}></progress>
        <div id="trainlines">
            <div defaultValue = "1" onClick={(e) => this.saveAndContinue(e, 1)} ref = "1" className="lines red"><h2  defaultValue = "1">1</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "2")} ref = "2"  className="lines red"><h2>2</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "3")} ref = "3"  className="lines red"><h2>3</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "4")} ref = "4"  className="lines green"><h2>4</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "5")} ref = "5"  className="lines green"><h2>5</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "6")} ref = "6"  className="lines green"><h2>6</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "7")} ref = "7"  className="lines purple"><h2>7</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "a")} ref = "a"  className="lines blue"><h2>A</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "c")} ref = "c"  className="lines blue"><h2>C</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "e")} ref = "e"  className="lines blue"><h2>E</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "b")} ref = "b"  className="lines orange"><h2>B</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "d")} ref = "d"  className="lines orange"><h2>D</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "f")} ref = "f"  className="lines orange"><h2>F</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "m")} ref = "m"  className="lines orange"><h2>M</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "g")} ref = "g"  className="lines lightgreen"><h2>G</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "j")} ref = "j"  className="lines brown"><h2>J</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "z")} ref = "z"  className="lines brown"><h2>Z</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "l")} ref = "l"  className="lines lightgray"><h2>L</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "s")} ref = "s"  className="lines darkgray"><h2>S</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "n")} ref = "n"  className="lines yellow"><h2>N</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "q")} ref = "q"  className="lines yellow"><h2>Q</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "r")} ref = "r"  className="lines yellow"><h2>R</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "w")} ref = "w"  className="lines yellow"><h2>W</h2></div>
            <div onClick={(e) => this.saveAndContinue(e, "t")} ref = "t"  className="lines anotherblue"><h2>T</h2></div>
        </div>
        
        <div id="footer"> &copy;  Crowdtips 2018</div>

    </div>
    );
  }
}

export default SelectLine;
