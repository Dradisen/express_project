let express = require('express');
let hbs = require('hbs');
let expressHbs = require('express-handlebars');
let path = require('path');
let sequelize = require('sequelize');
let sql = require('./models/database');
let bodyParser = require('body-parser');
let model = require('./models/Schema')(sql, sequelize);


let app = express();

app.engine('hbs', expressHbs({layoutsDir: 'server/views/layouts', defaultLayout: 'layout', extname: 'hbs'}));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');
app.use(express.static( path.join(path.dirname(__dirname), '/static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    let data = [];
    model.Direction.findAll().then((direction) => {
        direction.forEach(element => {
            data.push(element.dataValues);
        });
    }).then(() => {
        res.render('direction/index', {discipline: data});
    });
});

app.get('/direction/add', function(req, res){
    res.render('direction/add');
});

app.post('/direction/add', function(req, res){
    if((req.body.direction&&req.body.name_direction) != ''){
        model.Direction.findOrCreate(
            {where: {id_direction: req.body.direction},
             defaults: {name_direction: req.body.name_direction}
        }).then(([user, created]) => {
            console.log(user, created);
            res.render('direction/add', {success: 'Поле добавлено!'});
        });
    }else{
        res.render('direction/add', {error: 'Не все поля заполнены!'});
    }
});

app.get('/direction/edit/:id', function(req, res){
    model.Direction.findByPk(req.params.id).then((result) => {
        context = {
            id: result.id_direction,
            name_direction: result.name_direction
        };
        res.render('direction/edit', context);
    });
});

app.post('/direction/edit/:id', (req, res) => {
    model.Direction.update({
        id_direction: req.body.direction,
        name_direction: req.body.name_direction},
        { where: { id_direction: req.params.id}
    }).then(() => {
        res.redirect('/');
    });
})

app.get('/direction/delete/:id', function(req, res){
    let _id = req.params.id;
    model.Direction.destroy({
        where: {
           id_direction: _id
        }
     }).then(function(rowDeleted){
       if(rowDeleted === 1){
          console.log('Deleted successfully');
        }
     }, function(err){
         console.log(err); 
     }).then(() => {
         res.redirect('/');
     });
});

app.get('/direction/edit/:id', function(req, res){
    model.Direction.findByPk(req.params.id).then( result => {
        console.log(result);
        res.send(req.params.id);
    })
})

app.get('/groups/:id', (req, res) => {
    let data = []
    let context = {};
    model.Direction.findAll().then((result) => {
        result.forEach((el) => {
            data.push(el.dataValues);
        });
    }).then(() => {
        
        context['array'] = data;
        console.log(context);
        res.render('groups/add', context);
    });
});

app.listen(3000, function(){
    console.log('server start up');
});