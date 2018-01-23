
var firebase = require('firebase')

class DataOperations{
    constructor(){
        if(! DataOperations.instance){
            this.sessionKey = null;
            DataOperations.instance = this;
            this.initFirebase()

            this.generateSessionKey();
            console.log(this.getSessionKey())
        }
        return DataOperations.instance
    }

    initFirebase(){
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

    getFirebaseRef(){
        return this.ref;
    }

    generateSessionKey(){
        var key = this.ref.push().key
        this.sessionKey = key

        var currentSession = this.ref.child(key).child('time_on_site')

        currentSession.update({
            connected: firebase.database.ServerValue.TIMESTAMP
        })
        currentSession.onDisconnect().update({
            disconnected:firebase.database.ServerValue.TIMESTAMP
        });
    }

    getSessionKey(){
        return this.sessionKey;
    }

    getFirebaseTimestamp(){
        return firebase.database.ServerValue.TIMESTAMP
    }
}

const instance = new DataOperations();
Object.freeze(instance)

export default instance;