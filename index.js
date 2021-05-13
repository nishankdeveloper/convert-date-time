var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  
  console.log(request)
  console.log('request')
  
 response.send('You are on home page');

})

app.get('/getCurrentDate', function (req, res) {
  var data = new Date();
  var tzString = "Asia/Kolkata";
   var date = new Date();
   date = (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString})
  
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
          console.log( 'strTime' );

        console.log( strTime );

  
      console.log( data );
      res.send( data );
})


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
