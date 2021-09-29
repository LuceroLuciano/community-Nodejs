module.exports = (sequelize, Sequelize)=>{
    const Requirement = sequelize.define('requirement',{
        name: {
            type:Sequelize.STRING,
        },
        statusDelete: {
            type:Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    return Requirement;
};