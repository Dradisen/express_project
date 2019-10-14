module.exports = function(sql, datatype){
    return (function(){
        
        Directions = sql.define('direction', {
            id_direction: {
                type: datatype.INTEGER,
                primaryKey: true
            },
            name_direction: datatype.STRING(200)
        });
        
        Groups = sql.define('group',{
            name: {
                type: datatype.STRING(50),
                primaryKey: true
            },
            id_direction: datatype.INTEGER
        });
        
        Students = sql.define('student', {
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
            birthday: datatype.DATEONLY,
            get_card: datatype.DATEONLY,
            is_Head: datatype.BOOLEAN,
            id_group: datatype.STRING(50)
        });
        
        GroupDisciplines = sql.define('group_disciplines', {
            id_group: datatype.INTEGER,
            id_discipline: datatype.STRING(50)
        });

        Disciplines = sql.define('disciplins', {
            id_discipline: {
                type: datatype.STRING(50),
                primaryKey: true
            },
            discipline: datatype.STRING(300),
        });

        Ratings = sql.define('ratings', {
            id_student: datatype.INTEGER,
            id_discipline: datatype.STRING(50),
            rating: datatype.INTEGER,
            score: {
                type: datatype.ENUM,
                values: ['A','2','3','4','5']
            }
        });

        Directions.hasMany(Groups, {foreignKey: 'id_direction'});
        Groups.hasMany(Students, {foreignKey: 'id_group'});
        //Groups.hasMany(GroupDisciplines, {foreignKey: 'id_group'});
        Disciplines.hasMany(GroupDisciplines, {foreignKey: 'id_discipline'});
        Disciplines.hasMany(Ratings, {foreignKey: 'id_discipline'});
        Students.hasMany(Ratings, {foreignKey: 'id_student'});

        return {
            Direction: Directions,
            Group: Groups,
            Student: Students,
            GroupDiscipline: GroupDisciplines,
            Discipline: Disciplines,
            Rating: Ratings
        }
        
    })()

}

