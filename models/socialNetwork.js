module.exports = (sequelize, Sequelize)=>{
    const socialNetwork = sequilize.define('socialNetwork',{
        name: {
            type:Sequelize.STRING,
        },
        link: {
            type:Sequelize.STRING,
        },
        statusDelete: {
            type:Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    return socialNetwork;
};