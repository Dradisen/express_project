let express = require('express');
let StudentRouter = express.Router();
let sequelize = require('sequelize');
let sql = require('../models/database');
let model = require('../models/Schema')(sql, sequelize);

StudentRouter.get('/', async (req, res) => {
    context = {};
    let students = await model.Student.findAll();
    context['students'] = students;
    //return res.json(students);
    return res.render('students/index', context);
})

StudentRouter.route('/add')
    .get(async (req, res) => {
        context = {};
        groups = await model.Group.findAll();
        context['groups'] = groups;
        res.render('students/add', context);
    })
    .post(async (req, res) => {
        let name = req.body.name;
        let surname = req.body.surname;
        let lastname = req.body.lastname;
        let gender = req.body.gender;
        let birthday = req.body.birthday;
        let get_card = req.body.get_card;
        let is_head = req.body.is_head;
        let id_group = req.body.id_group;

        if((name&&surname&&lastname&&gender&&birthday&&get_card&&is_head&&id_group) != ''){
            [student, created] = await model.Student.findOrCreate({
                where: {
                    name: name, 
                    surname: surname, 
                    lastname: lastname
                },
                defaults: {
                    gender: req.body.gender,
                    birthday: req.body.birthday,
                    get_card: req.body.get_card,
                    id_group: req.body.id_group,
                    is_head: req.body.is_head
                }
            })
            //return res.json(student);
            return res.redirect('./');
        }
        return res.render('students/add');
    })

StudentRouter.route('/edit/:id')
    .get(async (req, res) => {

        let result = await model.Student.findByPk(req.params.id);
        let groups = await model.Group.findAll(); 

        let context = {
            name: result.name,
            surname: result.surname,
            lastname: result.lastname,
            gender: result.gender,
            birthday: result.birthday,
            get_card: result.get_card,
            is_head: result.is_head,
            id_group: result.id_group,
            groups: groups
        }

        res.render('students/edit', context);
    })
    .post(async (req, res) => {
        id = req.params.id;

        await model.Student.update({
            name: req.body.name,
            surname: req.body.surname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            birthday: req.body.birthday,
            get_card: req.body.get_card,
            is_head: req.body.is_head,
            id_group: req.body.id_group
        },{ 
            where: {
                id: id
            }
        })
        return res.redirect('../');
    })

module.exports = StudentRouter;