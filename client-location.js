class ClientLocation {

    /**
     * Set IP. Useful for caching purposes and extending scope
     * @param {string} ipAddress This is a test 
     */
    setUserIP(ipAddress) {
        this.userIP = ipAddress;
    }

    /**
     * @method getUserIp Obtain User IP using cloudflare with an optional callback after obtained
     * @param {function|void} callbackFunction Runs after ip address is obtained
     */
    getUserIp(callbackFunction) {
        if (this.userIP) {
            if (callbackFunction instanceof Function)
                callbackFunction(this.userIP);
            return this.userIP;
        }

        let requestObject = new XMLHttpRequest();

        /** @var Inst_ClientLocLib Used to access class scope */
        let Inst_ClientLocLib = this;

        requestObject.onreadystatechange = function(event) {
            if (this.readyState == 4 && this.status == 200) {
                const ipRegex = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/
                const IP = this.responseText.match(ipRegex)[0];
                Inst_ClientLocLib.setUserIP(IP);
                if (callbackFunction instanceof Function)
                    callbackFunction(IP);
            }
        }
        requestObject.open("GET", "https://www.cloudflare.com/cdn-cgi/trace", true);
        requestObject.setRequestHeader("Accept", "application/json");
        requestObject.send();
    }
    /**
     * Updates user location. Useful for caching purposes and extending scope
     * @param {JSON} userLocation JSON object of ip address information. Obtained from ipinfo.io
     */
    setUserLocation(userLocation) {
        this.userLocation = userLocation;
    }
    /**
     * Obtains user location based on IP, with callback needed for first run.
     * @param {function|void} userLocation JSON object of ip address information. Obtained from ipinfo.io
     */
    getUserLocation(callbackFunction) {
        /** @var Inst_ClientLocLib Used to access class scope */
        let Inst_ClientLocLib = this;
        if (this.userLocation) {
            if (callbackFunction instanceof Function)
                callbackFunction(this.userLocation);
            return this.userLocation;
        }
        this.getUserIp(function(ipAddress) {
            let requestObject = new XMLHttpRequest();
            requestObject.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let userLocation = JSON.parse(this.responseText);
                    Inst_ClientLocLib.setUserLocation(userLocation);
                    if (callbackFunction instanceof Function)
                        callbackFunction(userLocation);
                }
            }
            requestObject.open("GET", "https://ipinfo.io/" + ipAddress, true);
            requestObject.setRequestHeader("Accept", "application/json");
            requestObject.send();
        })
    }
}