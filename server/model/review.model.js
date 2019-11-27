module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define('reviews', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        content: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        star: {
            type: Sequelize.INTEGER
        }
    }
);

    return Review;
}