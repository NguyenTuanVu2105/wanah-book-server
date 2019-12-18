module.exports = (sequelize, Sequelize) => {
    const BookUser = sequelize.define('book_users', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        status: {
            type: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci'
        }
    });

    return BookUser;
};