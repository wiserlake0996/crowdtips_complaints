import React, { Component } from 'react';
import './ComplaintDetails.css'

var station_items=[
  {
    id:1,
    text:"miss my appointment"
  },
  {
    id:2,
    text:"Spend money on taxi/uber"
  },
  {
    id:3,
    text:"Late to work"
  },
  {
    id:4,
    text:"think about moving out of NYC!"
  }
]

var complaint_items={delays:[
    {
      id:1,
      text:"Miss my appointment/meeting"
    },
    {
      id:2,
      text:"Spend money on taxi/uber"
    },
    {
      id:3,
      text:"Late to work"
    },
    {
      id:4,
      text:"think about moving out of NYC!"
    }
  ], 
  tickets:[
    {
      id:1,
      text:"Machines were broken"
    },
    {
      id:2,
      text:"Not accepting cash payments"
    },
    {
      id:3,
      text:"Not accepting card payments"
    },
    {
      id:4,
      text:"No payment options available"
    }
  ],
  dirtyness:[
    {
      id:1,
      text:"Garbage bins were overflowing"
    },
    {
      id:2,
      text:"Rodents on the platform"
    },
    {
      id:3,
      text:"Bad smell"
    },
    {
      id:4,
      text:"Other riders loitering"
    }
  ],
  staff:[
    {
      id:1,
      text:"rude"
    },
    {
      id:2,
      text:"Didnt want to answer my question"
    },
    {
      id:3,
      text:"Long response time"
    },
    {
      id:4,
      text:"Disinterested in helping"
    }
  ],
  security:[
    {
      id:1,
      text:"No patroling cops "
    },
    {
      id:2,
      text:"Drunk people around"
    },
    {
      id:3,
      text:"People doing drugs and more"
    },
    {
      id:4,
      text:"Someone smoking"
    }
  ]
}

class ComplaintDetails extends Component {

  constructor(props){
    super(props)

    this.saveAndContinue = this.saveAndContinue.bind(this)
    this.complaintCheckEvent = this.complaintCheckEvent.bind(this)
    this.submitComplaint = this.submitComplaint.bind(this)

    this.state = {
      currentCheckedItems:{}
    }
  }

  saveAndContinue() {
    var selected = Object.values(this.state.currentCheckedItems) //get all selected buttons

    var out ={
        complaints: {
          type:this.props.complaintType,
          selected: selected,
          other:this.refs.othertext.value || ""
        }
    }
    this.props.saveValues(out)
  }

  complaintCheckEvent(data){
    this.setState({
      currentCheckedItems: data
    })
  }

  submitComplaint(e){
    e.preventDefault
    this.saveAndContinue()
    this.props.submitData()
  }

  render() {

    var style = {
      width : (this.props.currStep / 4 * 100) + '%'
    }
    return (
      <div id="rightsidebaro">
        
        
        <div id="header"><h1>I hate the MTA!</h1></div>
        <div id="valueproposition"><h3>Do you agree? if yes, drop your complains here  and we will send it to the MTA on behalf of you!</h3></div>
        <div id="complain"><h1>Delays made me</h1></div> 
        {/* <span className="progress-step">Step {this.props.currStep}</span>
        <progress className="progress" style={style}></progress> */}

        <ComplaintDetailsList id="complaints-options-list" complaintData = {complaint_items[this.props.complaintType]} complaintType={this.props.complaintType} checkItem={this.complaintCheckEvent} items={station_items}/>
        
        <div className="ortext">
        <h4 > OR </h4>
        </div>
        <textarea ref="othertext" placeholder="other.."rows="7" id="other-text-area" ></textarea>

        <div> 
          <button id="submit-details-button"onClick={this.submitComplaint}>Submit</button>
          <button id="cancel-details-button">Cancel</button>
          {/* <button>add more..</button> */}
        
        </div>


 
        <div id="footer">©Crowdtips 2018</div>
    </div>
    );
  }
}



class ComplaintDetailsList extends Component{

  
  constructor(props){
    super(props)
    this.itemChecked = this.itemChecked.bind(this)
    this.state = {
      checkedItems:{}
    }
  }


  itemChecked(e, id, text){

    var allItems = this.state.checkedItems;
    if (id in allItems){
      delete allItems[id]
      console.log("exist")
    }else{
      allItems[id] = text
      console.log("doesnt exist")

    }
    this.setState({
      checkedItems: allItems
    })
    this.props.checkItem(allItems)
  }


  render(){

    var compType = this.props.complaintType

    
    return (
      <div className="details-list">
        {
          this.props.complaintData.map(function(item){
            return(
            <div id="ck-button" key={item.id} >
            <label>
                <input onClick={(e) => this.itemChecked(e, item.id, item.text)} key={item.id} type="checkbox" value="missed appointment"/><span>{item.text}</span>
            </label>
          </div>
            )
          }.bind(this))
        }
      </div>

    );
  }

}
export default ComplaintDetails;

