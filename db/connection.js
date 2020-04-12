const Sequelize = require('sequelize');
const db = {}
const sequelize = new Sequelize('minieli', 'root', 'root@123', {
    host: 'localhost',
    dialect: 'mysql',
  })
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });  

 db.sequelize = sequelize
 db.Sequelize = Sequelize
 module.exports = db;