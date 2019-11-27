module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('categories', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        name: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci'
    });

    return Category;
};