let express = require('express');
let hbs = require('hbs');
let path = require('path');
let sequelize = require('sequelize');
let sql = require('./models/database');
let bodyParser = require('body-parser');
let Schema = require('./models/Schema')(sql, sequelize);


let app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');
app.use(express.static( path.join(path.dirname(__dirname), '/static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    let d = []
    Schema.Direction.findAll().then((users) => {
        users.forEach(element => {
            d.push(element.dataValues);
        });
    });
    res.render('index', {discipline: d});
});

app.post('/', function(req, res){
    Schema.Direction.create({
        id_direction: req.body.direction,
        name_direction: req.body.name_direction
    });
});

app.listen(3000, function(){
    console.log('server start up');
});