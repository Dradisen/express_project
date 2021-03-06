let Sequelize = require('sequelize');
let db = require('../config/setting');

let sql = new Sequelize(db.database, db.name, db.password, {
    host: db.localhost,
    dialect: 'mysql',
    define: {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci', 
      }
});

let Schema = require('./Schema')(sql, Sequelize);

sql.authenticate().then(() => {
    //console.log('Connection is ok');
}).catch((err) => {
    console.log(err);
});

sql.sync(/*{force: true}*/).then(() => {
    
}).catch((err) => {
    console.log(err);
})

module.exports = sql;
module.exports.Schema = Schema;