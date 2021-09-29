//module
//ORM
// CUANDO UN CAMPO NO hace operaciones (solo es informacion)
// se define como un string
module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define('member',{
        fullName: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            unique:true,
        },
        phoneNumber: {
            type: Sequelize.STRING,
        },
        occupation: {
            type:Sequelize.STRING,
        },
        age: {
            type:Sequelize.STRING,
        },
        age: {
            type:Sequelize.INTEGER,
        },
        statusDelete: {
            type:Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    return Member;
};