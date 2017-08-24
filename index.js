 const express = require('express');
 const exphbs = require('express-handlebars');
 const serve = require('express-static');
 const bodyParser = require('body-parser')
 const session = require('express-session')
 const mongoose = require('mongoose');
 const app = express();

 const Registrations = require('./registrations');

const models = require('./models/registrationsSchemaModel');

const registrations = Registrations(models);

 app.use(express.static('public'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// redirect to greet
 app.get('/reg_numbers', function(req, res){
   models.find({}, function(err, result) {
     if (err) {
       console.log(err);
     } else {
       res.render('add', {
         plateNumbers: result
       });
     }
   });
 });

 app.get('/', function(req, res){res.redirect('/reg_numbers')})
 app.post('/reg_numbers', registrations.regPlateNumberFunction);



  const port = process.env.PORT || 3005;

  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.listen(port , function(){
    console.log('app super ready to go:' + port);
  });
