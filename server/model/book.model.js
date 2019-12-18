module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define('books', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        name: { 
            type: Sequelize.TEXT + ' CHARACTER SET utf8 NOT NULL'
        },
        publisher: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        description: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        image: {
            type: Sequelize.STRING
        },
        star: {
            type: Sequelize.FLOAT
        }
    });

    return Book;
}