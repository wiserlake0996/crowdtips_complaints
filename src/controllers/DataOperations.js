
var firebase = require('firebase')
var MobileDetect = require('mobile-detect'),
    md = new MobileDetect(window.navigator.userAgent);
var $ = require("jquery");

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

        this.getUserInformation(key)
    }

    getSessionKey(){
        return this.sessionKey;
    }

    getFirebaseTimestamp(){
        return firebase.database.ServerValue.TIMESTAMP
    }

    getUserInformation(){
        //location and Ip address
        $.getJSON('https://api.ipify.org?format=json', function(data){
            console.log(data.ip);
            var ip = data.ip
              
            $.get("https://freegeoip.net/json/"+String(ip), function(data2){  
                var userData = {
                    ip_address: ip,
                    location: data2
                }

                var deviceData = {
                    md_mobile:md.mobile() || "",
                    md_phone:md.phone() || "",
                    md_tablet:md.tablet() || "",
                    md_agent: md.userAgent() || "",
                    md_os: md.os() || "",
                    is_iphone: md.is('iphone') || "",
                    is_bot: md.is('bot') || "",
                    screen_height: window.myScreenHeight || "",
                    screen_width: window.myScreenWidth || "",
                    browser_height: window.innerHeight || "",
                    browser_width: window.innerWidth || "",
                    mobile_os:this.getMobileOperatingSystem()
                }

                this.storeUserAndDeviceDetails(userData, deviceData)

              }.bind(this))
        }.bind(this));
   
    }

    storeUserAndDeviceDetails(user_data, device_data){

        console.log("in store user values")
        var sessKey = this.getSessionKey()
        console.log("Session key ", sessKey)
        var updates = {}

        var updateRef = this.ref.child(sessKey)
        updates['device_details'] = device_data
        updates['user_details'] = user_data

        updateRef.update(updates)

    }
  
  
    getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      
            // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }
      
        if (/android/i.test(userAgent)) {
            return "Android";
        }
      
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }
      
        return "unknown";
    }
}

const instance = new DataOperations();
Object.freeze(instance)

export default instance;