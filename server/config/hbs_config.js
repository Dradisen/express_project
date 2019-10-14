let hbs = require('express-handlebars');

module.exports = hbs.create({
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