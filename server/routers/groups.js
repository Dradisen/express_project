let express = require('express');
let GroupRouter = express.Router();
let sequelize = require('sequelize');
let sql = require('../models/database');
let model = require('../models/Schema')(sql, sequelize);

GroupRouter.get('/', async (req, res) => {
    context = {};
    let groups = await model.Group.findAll();

    context['groups'] = groups;

    //return res.json(context);
    res.render('groups/index', context);
})

GroupRouter.route('/add/')
    .get(async (req, res) => {
        context = {};
        let directions = await model.Direction.findAll();
        context['directions'] = directions;

        return res.render('groups/add', context);
    })
    .post(async (req, res) => {
        let name_group = req.body.name_group;
        let id_direction = req.body.id_direction;

        if((name_group&&id_direction) != ''){
            let [group, created] = await model.Group.findOrCreate({
                where: {
                    name: name_group
                },
                defaults: {
                    id_direction: id_direction
                }
            });
            //return res.json(created);
            return res.redirect('./');
        }
    })

GroupRouter.route('/edit/:id')
    .get(async (req, res) => {
        context = {};
        let group = await model.Group.findByPk(req.params.id);
        let directions = await model.Direction.findAll();
        context['directions'] = directions;
        context['group'] = group
        res.render('groups/edit', context);
    })
    .post(async (req ,res) => {
        let id = req.params.id;
        let name_group = req.body.name;
        let direction = req.body.id_directions;

        await model.Group.update({
            id_direction: direction,
            name: name_group
        }, {
            where: {
                id: id
            }
        })
        res.redirect('../');
    })

GroupRouter.get('/delete/:id', async (req, res) => {
    await model.Group.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('../');
})

module.exports = GroupRouter;