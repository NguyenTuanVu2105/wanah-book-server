module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define('author', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        name: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci'
    }
);

    return Author;
}