import React, { Component } from 'react';
import './Menu.css';
var firebase = require('firebase')

class Menu extends Component {

    constructor(props){
        super(props)

        this.initFirebase = this.initFirebase.bind(this)
        this.writeData = this.writeData.bind(this)
        this.ref = null
    }

    componentDidMount(){
        this.initFirebase()
    }

        initFirebase(){

  // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBW0xY7OLHXBIWa3c5iHa2-7JP9kngBwCc",
            authDomain: "complaints-mta.firebaseapp.com",
            databaseURL: "https://complaints-mta.firebaseio.com",
            projectId: "complaints-mta",
            storageBucket: "",
            messagingSenderId: "772383984934"
        };
        firebase.initializeApp(config);
        this.ref = firebase.database().ref('complaints')
    }

    handleSubmit(e){
        e.preventDefault();
        var toPost =[]

        if(this.refs.delay.checked){
            toPost.push("delay")
        }

                if(this.refs.staff.checked){
            toPost.push("staff")
        }

                if(this.refs.tickets.checked){
            toPost.push("tickets")
        }

                if(this.refs.cleanliness.checked){
            toPost.push("cleanliness")
        }

                if(this.refs.security.checked){
            toPost.push("security")
        }

                if(this.refs.other.checked){
            toPost.push("other")
        }

         
            var comment = this.refs.comment.value;

            var final = {
                tags:toPost || "",
                text: comment || "",
                station: this.props.selectedStation || ""
            }

            console.log(final)

            this.writeData(final)
   
    }

    writeData(data){
          var newPostKey = firebase.database().ref().child('complaints').push().key;
                // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/complaints/' + newPostKey] = data;



         firebase.database().ref().update(updates);

         this.refs.delay.checked = false
         this.refs.cleanliness.checked = false
         this.refs.staff.checked = false
         this.refs.security.checked = false
         this.refs.other.checked = false
         this.refs.tickets.checked = false

         this.refs.comment.value = ""
         
         alert("Submission Received! Thank you")

    }
  render() {
    return (
        <div id="menu">
            <h2>{this.props.selectedStation.name}</h2>
            <p>{this.props.selectedStation.line}</p>

            <div id="button-group">
                <div className="ck-button">
                    <label>
                        <input ref="delay" type="checkbox" value="delay"/><span>Delay</span>
                    </label>
                </div>


                <div className="ck-button">
                    <label>
                        <input type="checkbox" ref="staff"/><span>Staff</span>
                    </label>
                </div>

                <div className="ck-button">
                    <label>
                        <input type="checkbox" ref="tickets"/><span>Tickets</span>
                    </label>
                </div>

                <div className="ck-button">
                    <label>
                        <input type="checkbox" ref="cleanliness"/><span>Clean</span>
                    </label>
                </div>

                <div className="ck-button">
                    <label>
                        <input type="checkbox" ref="security"/><span>Security</span>
                    </label>
                </div>

                <div className="ck-button">
                    <label>
                        <input type="checkbox" ref="other"/><span>Other</span>
                    </label>
                </div>                                                                                
            </div> 

        <div  className="textarea-container">
                <textarea ref="comment" rows="4" cols="25">
                </textarea>
            </div>

            <button onClick={this.handleSubmit.bind(this)}>Done</button>   
        </div>    
    );
  }
}

export default Menu;