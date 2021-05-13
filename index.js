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
  
      console.log( data );
      res.end( data );
})


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
