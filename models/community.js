module.exports = (sequelize, Sequelize)=>{
    const Community = sequelize.define('community',{
        email: {
            type:Sequelize.STRING,
            unique: true,  //para que no se repitan los correos
        },
        password: {
            type:Sequelize.STRING,
        },
        name: {
            type:Sequelize.STRING,
        },
        type: {
            type:Sequelize.STRING,
        },
        logo:{
            type: Sequelize.STRING,
        },
        statusDelete: {
            type:Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    return Community;
};