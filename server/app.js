let express = require('express');
let hbs = require('hbs');
let expressHbs = require('express-handlebars');
let path = require('path');
let sequelize = require('sequelize');
let sql = require('./models/database');
let model = require('./models/Schema')(sql, sequelize);
let bodyParser = require('body-parser');


let app = express();

app.engine('hbs', expressHbs({layoutsDir: 'server/views/layouts', defaultLayout: 'layout', extname: 'hbs'}));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');
app.use(express.static( path.join(path.dirname(__dirname), '/static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/directions', require('./routers/directions'));
app.use('/groups', require('./routers/groups'));
app.use('/students', require('./routers/students'));

// app.get('/groups/:id', async (req, res) => {
//     let data = []
//     let context = {};
//     let result = await model.Direction.findAll();
//     result.forEach((el) => {
//         data.push(el.dataValues);
//     });
//     context['array'] = data;
//     console.log(context);
//     res.render('groups/add', context);
// });

app.get('/', async (req, res) => {
    res.render('index');
});

app.listen(3000, function(){
    console.log('server start up');
});