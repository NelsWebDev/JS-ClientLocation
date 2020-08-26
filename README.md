# JS-ClientLocation

Small Javascript library for obtaining the IP address and/or location using CloudFlare and ipinfo.io (not affilated).  

**Note:** Ideally you should use the JavaScript location API to obtain the user's location. This simply is an alternative which does not require the visitor to enable location services.  

### Usage

Download the client-location.js file, embedding it into your web page using HTML script tags.

<script src="//domain.com/path/to/js/client-location.js"></script>

##### Functions 

Feel free to rename the userIPAddress and jsonLocationObj to whatever you want. 

```javascript
userLocation = new ClientLocation();
  userLocation.getUserIp( function (userIPAddress){
    // callback code here
  });  
  userLocation.getUserLocation( function (jsonLocationObj) {
    // callback code here
  });
```

  

