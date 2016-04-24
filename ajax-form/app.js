var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/', function (req, res) {
  console.log(req.body);
  res.json(req.body);
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});