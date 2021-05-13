var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get(endpoointVariable, function(request, response) {
  
  
  console.log(endpoointVariable)
  console.log(request)
  console.log('request')
  
 response.send('You are on home page');

})

app.get('/getCurrentDateTime', function (req, res) {
  
  var body = {};
  
  try {
    
    var date = new Date();
    date = new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US"));

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
  }
  finally {
    res.send(body);
  }
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
