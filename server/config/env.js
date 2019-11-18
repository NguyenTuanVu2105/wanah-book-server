require('dotenv').config();

const env = {
    database: 'wanah',
    username: 'root',
    password: '210599',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
	    max: 5,
	    min: 0,
	    acquire: 30000,
	    idle: 10000
    }
};
 
module.exports = env;