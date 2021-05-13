//https://github.com/filipdanic/compact-timezone-list/blob/master/index.js
var express = require('express')

var app = express()
//const timezone = require("./timezone");

//console.log(timezone)
//console.log('timezone')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  
  console.log('request')
  
 response.send('You are on home page');

})

app.get('/getCurrentDateTime', function (req, res) {
  
  var body = {};
  
  try {
    
        Date.setClientTimezoneOffset(300)

    
    var clientTimezoneOffset = new Date().getTimezoneOffset()/60;//offset in hours
    console.log(clientTimezoneOffset)
    
//    var tzString = "Asia/Kolkata";
    var date = new Date();
    date = new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US" ));//, {timeZone: tzString}));

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    body["success"] = true;
    body["dateTime"] = date.toString();
    body["time"] = strTime;
    
    
  }
  catch (e) {
    body["success"] = false;
    console.log(e)
    console.log('exception message')
    
  }
  finally {
    res.send(body);
  }
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
