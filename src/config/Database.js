import Sequelize from 'sequelize'
const db = new Sequelize('auth_db' , 'root' , 'awbi@2004',{
    host: "localhost",
    dialect: "mysql"
});

export default db;