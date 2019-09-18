module.exports = function(sql, datatype){
    return (function(){
        Users = sql.define('users', {
            name: {
                type: datatype.STRING(200),
                allowNull: false
            },
            surname: {
                type: datatype.STRING(200),
                allowNull: false
            },
            lastname:{
                type: datatype.STRING(200),
                allowNull: false
            },
            gender: {
                type: datatype.ENUM,
                values: ['M', 'F']
            },
            birthday: datatype.DATE,
            id_face:{
                type: datatype.INTEGER
            },
            get_ticket: datatype.DATE,
            isHead: datatype.BOOLEAN,
            name_group: datatype.STRING,
            id_group: datatype.INTEGER
        })

        let Disciplines = sql.define('disciplins', {
            discipline: datatype.STRING(300),
            id_way: datatype.INTEGER.UNSIGNED,
            hours: datatype.INTEGER,
            format: {
                type: datatype.ENUM,
                values: ['A', 'E']
            }
        })

        let Exams = sql.define('exams', {
            date_pass: datatype.DATE,
            id_discipline: {
                type: datatype.INTEGER,
            },
            id_student: datatype.INTEGER,
            point: datatype.INTEGER,
            score: {
                type: datatype.ENUM,
                values: ['A', '1', '2', '3', '4', '5']
            }
        })
        Users.hasMany(Exams, {foreignKey: 'id_student'});
        Disciplines.hasMany(Exams, {foreignKey: 'id_discipline'})
        //Exams.belongsTo(Users, {foreignKey: 'id'});

        //Disciplines.belongsTo(Exams, {foreignKey: 'id_disciplines', sourceKey: 'id'});
        
        return {
            User: Users,
            Discipline: Disciplines,
            Exam: Exams
        }
    })()

}

