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

DisciplineRouter.route('/add')
    .get(async (req, res) => {
        res.render('disciplins/add');
    })
    .post(async (req, res) => {
        let id_discipline = req.body.id_discipline;
        let name_discipline = req.body.name_discipline;

        let [discipline, created] = await model.Discipline.findOrCreate({
            where: {id_discipline: id_discipline},
            defaults: {
                discipline: name_discipline
            }
        });
        res.redirect('./');
    })

DisciplineRouter.route('/edit/:id')
    .get(async (req, res) => {
        let result = await model.Discipline.findByPk(req.params.id);
        context = {
            id: result.id_discipline,
            discipline: result.discipline
        };
        res.render('disciplins/edit', context);
    })
    .post(async (req, res) => {
        let id = req.params.id;
        let id_change = req.body.id_discipline;
        let name_discipline = req.body.name_discipline;

        await model.Discipline.update({
                id_discipline: id_change,
                discipline: name_discipline
        },{
            where: {id_discipline: id}
        })

        res.redirect('../');
    })

DisciplineRouter.get('/delete/:id', async (req, res) => {
    await model.Discipline.destroy({
        where: {
            id_discipline: req.params.id
        }
    })
    res.redirect('../');
})

module.exports = DisciplineRouter;