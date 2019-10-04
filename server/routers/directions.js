let express = require('express');
let DirectionRouter = express.Router();
let sequelize = require('sequelize');
let sql = require('../models/database');
let model = require('../models/Schema')(sql, sequelize);

DirectionRouter.get('/', async (req, res) => {
    let data = [];
    let direction = await model.Direction.findAll();
    direction.forEach(element => {
        data.push(element.dataValues);
    });
    res.render('directions/index', {discipline: data});
})

DirectionRouter.route('/add')
    .get(async (req, res) => {
        res.render('directions/add');
    })
    .post(async (req, res) => {
        if((req.body.direction&&req.body.name_direction) != ''){
            [user, created] = await model.Direction.findOrCreate({
                where: {
                    id_direction: req.body.direction
                },
                defaults: {
                    name_direction: req.body.name_direction
                }
            });
            res.render('directions/add', {success: created, added: true});
        }
    })


DirectionRouter.route('/edit/:id')
    .get(async (req, res) => {
        context = {};
        let result = await model.Direction.findByPk(req.params.id);
        context = {
            id: result.id_direction,
            name_direction: result.name_direction
        };
        res.render('directions/edit', context);
    })
    .post(async (req, res) => {
        await model.Direction.update({
            id_direction: req.body.direction,
            name_direction: req.body.name_direction
        },{
          where: {
              id_direction: req.params.id
          }
        })
        res.redirect('../');
    })

DirectionRouter.get('/delete/:id', async (req, res) => {
    let _id = req.params.id;
    try{
        await model.Direction.destroy({
            where: {
                id_direction: _id
            }
        })
        res.redirect('../');
    }catch(err){
        console.log(err);
    }
});

module.exports = DirectionRouter;