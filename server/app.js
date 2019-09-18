let express = require('express');
let hbs = require('hbs');
let path = require('path');
let sql = require('./models/database');


let app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
    res.render('index');
});

app.listen(3000, function(){
    console.log('server start up');
})