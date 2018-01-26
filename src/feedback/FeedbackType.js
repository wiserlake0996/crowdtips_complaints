import React, { Component } from 'react';

import ReactAutocomplete from 'react-autocomplete'

class FeedbackType extends Component{

    constructor(props){
        super(props)

        this.saveAndContinue = this.saveAndContinue.bind(this)
        this.state = {
            value:''
        }
    }

    saveAndContinue(e, data) {
        //e.preventDefault()
    
        // Get values via this.refs
    
        console.log(data)
        var out ={
            feedback_type: data
        }
        this.props.setFeedbackType(data)
        this.props.saveValues(out)
        this.props.nextStep()
    }
    
    render(){

        var bgColor = {
            backgroundColor: this.props.baseColor      
        }
        return(
            <div>
                <div id="header">
                    <h1> Feedback Type </h1>
                </div>
                
                <div id="valueproposition">
                    <h3> Please select a feedback type </h3>
                </div>

                <div id="complain">  
                    <h1 style={{textAlign:"center"}}> I have a </h1>
                </div>

                <ReactAutocomplete 
                    items=
                    {
                        [
                            { id: 'foo', label: 'Compliment' },
                            { id: 'bar', label: 'Complaint' },
                        ]
                    }
                    shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item.label}
                    renderItem=
                    {
                        (item, highlighted) =>
                            <div key={item.id} className="feedback-type-list-item">
                                <h3>{item.label}</h3>
                            </div>
                           
                    }
                    value={this.state.value}
                    onChange={e => this.setState({ value: e.target.value })}
                    // onSelect={value => this.setState({ value })}
                    onSelect={
                        (value) => {
                            this.setState({ value })
                            this.saveAndContinue(null, value)
                        }
                    }
                    wrapperStyle={{
                        display:'block'
                      }}

                />

                <div id="complain">  
                    <h1  style={{textAlign:"center", marginTop:"140px"}}> About The MTA Subway! </h1>
                </div>       
            </div>
        )
    }
}

export default FeedbackType;