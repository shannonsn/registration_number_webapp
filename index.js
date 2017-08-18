 const express = require('express');
 const exphbs = require('express-handlebars');
 const serve = require('express-static');
 const bodyParser = require('body-parser')
 const session = require('express-session')
 const app = express();


 app.use(express.static('public'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


 app.get('/reg_numbers/', function(req, res){
   res.render('view')

 });

 // app.get('/reg_number/id', function(req, res){
 //   res.send(req.params.id);
 //   console.log(req.params.id);
 // });

// start the server

var server = app.listen(3005, function () {

 var host = server.address().address;
 var port = server.address().port;

 console.log('app is running at http://%s:%s', host, port);

});
