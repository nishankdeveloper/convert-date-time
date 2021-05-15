//https://github.com/filipdanic/compact-timezone-list/blob/master/index.js
var express = require('express')
const timezone = require("./timezone");

var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  
 response.send('You are on home page');

})

app.get('/getCurrentDateTime', function (req, res) {
  
  var body = {};
  try{
    var dateTime = req.query.dateTime;
    var convertTo = req.query.convertTo;
    var utcOffset = "+00:00";   // by default

    if(dateTime != null && dateTime != 'undefined' && convertTo != null && convertTo != 'undefined'){

      //Check timezone.JSON file tzCode to get offset value.
      timezone.forEach(element => {
        var utcOffset = element.tzCode != null && element.tzCode != 'undefined' && element.tzCode == convertTo ? element.offset != null && element.offset != 'undefined'? element.offset : null : null;
        this.utcOffset = utcOffset;
      });

      //Split the offset fetched into hours and minutes.
      var a = utcOffset.split(':');
      var hour = +a[0];
      var minute = utcOffset[0] == '-' ? -1 * +a[1] : +a[1] ;

      //Get the value in minutes for the offset.
      var tzDifference = hour * 60 + minute;
      var targetTime = new Date(dateTime);

      //get the date in convertTo timezone.
      targetTime = new Date(targetTime.getTime() + tzDifference * 60 * 1000);

      //get the am/pm format time from the targetTime.
      var hours = targetTime.getHours();
      var minutes = targetTime.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;

      body["success"] = true;
      body["date"] = targetTime.getFullYear() + "-" + (targetTime.getMonth()+1) + "-" + targetTime.getDate();     //// date in YYYY-MM-DD format
      body["time"] = strTime;
      body["dateTime"] = targetTime.toISOString();


    }else{

      body["success"] = false;
      body["message"] = "Required field missing or not Date not in proper ISO format.";

    }
  
  }catch (exception) {
    body["success"] = false;
    body["message"] = exception;
  }
  finally {
    res.send(body);
  }
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
