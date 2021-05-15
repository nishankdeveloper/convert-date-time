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
 //console.log(req)
  let dateTime = req.query.dateTime;
  let convertTo = req.query.convertTo;
   console.log(dateTime)
 console.log(convertTo)

  
  var body = {};
  
  try {
    
     

    
    var clientTimezoneOffset = new Date().getTimezoneOffset()/60;//offset in hours
 //   console.log(clientTimezoneOffset)
    
    
//var now = new Date("January 02, 2012 22:00:00 GMT+0530");
//console.log(now);
//console.log(now.toISOString());
//var nowUtc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
//console.log(nowUtc);
//console.log(nowUtc.toISOString());
    


    
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
    body["dateTime"] = date.toISOString();
    body["time"] = strTime;
    
    
  }
  catch (e) {
    body["success"] = false;
 //   console.log(e)
 //   console.log('exception message')
    
  }
  finally {
 ////   console.log('timenow')
 //   console.log(new Date().toISOString())
    
    res.send(body);
  }
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
