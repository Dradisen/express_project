let express = require('express');
let DisciplineGroupRouter = express.Router();
let sequelize = require('sequelize');
let sql = require('../models/database');
let model = require('../models/Schema')(sql, sequelize);

DisciplineGroupRouter.get('/', async (req, res) => {
    res.render('group_disciplines/index');
})



module.exports = DisciplineGroupRouter;