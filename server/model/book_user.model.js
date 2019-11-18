module.exports = (sequelize, Sequelize) => {
    const BookUser = sequelize.define('book_users', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
    });

    return BookUser;
};