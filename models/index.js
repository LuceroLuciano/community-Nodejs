//index de modelos
// conexión de bd

const Sequelize = require('sequelize');
const DB = require('../config/config.js');

const sequelize = new Sequelize(DB.DBNAME, DB.USER, DB.PASSWORD, {
    host: DB.HOST,
    dialect: DB.dialect,
  });

  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.community = require("./community")(sequelize, Sequelize);
  db.address = require("./address")(sequelize, Sequelize);
  db.mmber = require("./member")(sequelize, Sequelize);

  //asociacion de direcciones con comunidades
  db.address.hasMany(db.community);
  //asociacion de comunidades con direcciones
  db.community.belongsTo(db.address);

  module.exports = db;