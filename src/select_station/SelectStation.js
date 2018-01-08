import React, { Component } from 'react';
import './SelectStation.css'

class SelectStation extends Component {
    constructor(props){
        super(props)

        this.state = {
            initialItems: [
              ],
              items: [],
              selectedItems:[]
        }
        this.filterList = this.filterList.bind(this)
        this.saveAndContinue = this.saveAndContinue.bind(this)
        this.selectStationsMatchingLine = this.selectStationsMatchingLine.bind(this)
        this.setInitialitems = this.setInitialitems.bind(this)
    }
    componentWillMount(){
        var line = this.props.selectedLine
        var data = require('../data/subway-stations.json')
        var subwayStations = data['features']
        this.subwayStations = subwayStations

        this.setInitialitems(subwayStations)

        this.selectStationsMatchingLine(line)
        //this.setState({items: this.state.initialItems})
    }

    setInitialitems(data){
        this.setState({
            initialItems: data
        })
    }

    filterList(event){
        var updatedList = this.state.items//this.state.initialItems;
        updatedList = updatedList.filter(function(item){
          return item.properties.name.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1;
        });
        this.setState({selectedItems: updatedList});
      }

    saveAndContinue(e, data, stationData) {
        e.preventDefault()
        console.log(data)
        var out ={
            station_name: data
        }

        this.props.updateSelectedStation(stationData)
        this.props.saveValues(out)
        this.props.nextStep()
    }

    selectStationsMatchingLine(lineSelection){
        //read stations data
       // var data = require('../data/subway-stations.json')
        var subwayStations = this.subwayStations//data['features']
        var toReturn = []
        //loop throug features array
        for(var i=0; i< subwayStations.length; i++){
            var line = subwayStations[i]["properties"]["line"]

            var lineSplit = line.split("-")
            console.log(typeof(lineSplit[0], typeof(lineSelection)))

            if(/^[a-zA-Z]+$/.test(lineSelection)){
                if(lineSplit.indexOf(lineSelection.toUpperCase()) != -1){
                    toReturn.push(subwayStations[i])
                }
            }else{
                if(lineSplit.indexOf(String(lineSelection)) != -1){
                    toReturn.push(subwayStations[i])
                }
            }
        }

        this.setState({
            items: toReturn,
            selectedItems: toReturn
        })
        
    }

    render(){

        var style = {
            width : (this.props.currStep / 4 * 100) + '%'
          }
        return (
            <div id="rightsidebaro">
            
                <div id="header"><h1>I hate the MTA!</h1></div>
                <div id="valueproposition"><h3>Do you agree? if yes, drop your complains here  and we will send it to the MTA on behalf of you!</h3></div>
                <div id="train"><h1>Select a train station</h1></div>  
                {/* <span className="progress-step">Step {this.props.currStep}</span>
                <progress className="progress" style={style}></progress> */}
                <div id="trainlines">
                    <div className="filter-list">
                    <input type="text" placeholder="Search" onChange={this.filterList}/>
                    <List saveData={this.saveAndContinue}items={this.state.selectedItems}/>
                    </div>
                </div>
            </div>
          );
    }
}

class List extends Component {

    render(){
        return(
            <ul>
            {
              this.props.items.map(function(item) {
                return <li onClick={(e) => this.props.saveData(e, item.properties.name, item)} key={item.properties.name}>{item.properties.name}</li>
              }.bind(this))
             }
            </ul>
          )         
    }
}

export default SelectStation;