let express = require('express');
let DisciplineRouter = express.Router();
let sequelize = require('sequelize');
let sql = require('../models/database');
let model = require('../models/Schema')(sql, sequelize);

DisciplineRouter.get('/', async (req, res) => {
    let context = {};
    let disciplins = await model.Discipline.findAll();
    context['disciplins'] = disciplins;

    return res.render('disciplins/index', context);
})

module.exports = DisciplineRouter;