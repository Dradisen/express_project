let express = require('express');
let expressHbs = require('express-handlebars');
let path = require('path');
let sequelize = require('sequelize');
let sql = require('./models/database');
let model = require('./models/Schema')(sql, sequelize);
let bodyParser = require('body-parser');

let hbs = expressHbs.create({
    helpers: {
        equal: function(a, b, options){
            if(a == b){
                return options.fn(this);
            }else{
                return options.inverse(this);
            }
        }
    },
    layoutsDir: 'server/views/layouts',
    defaultLayout: 'layout',
    extname: '.hbs'
})

let app = express();

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static( path.join(path.dirname(__dirname), '/static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/directions', require('./routers/directions'));
app.use('/groups', require('./routers/groups'));
app.use('/students', require('./routers/students'));
app.use('/disciplins', require('./routers/disciplins'));
app.use('/group-disciplins', require('./routers/disciplins-group'));

app.get('/', async (req, res) => {
    res.render('index');
});

app.listen(3000, function(){
    console.log('server start up');
});