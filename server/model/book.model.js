module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define('books', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        publisher: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        image: {
            type: Sequelize.STRING
        },
        star: {
            type: Sequelize.INTEGER
        }
    });

    return Book;
}