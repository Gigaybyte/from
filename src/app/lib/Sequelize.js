const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbhrm', 'root', '12345', {
  host: 'localhost',   
  dialect: 'mysql',    
  logging: false,    
});


export default sequelize;
