var express = require('express');  
var app = express();  
app.get('/', function (req, res) {  
  res.send('Test Hello World');  
});  

const PORT = process.env.PORT || 5000

var server = app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
