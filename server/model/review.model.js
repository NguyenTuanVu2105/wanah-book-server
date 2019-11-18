module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define('reviews', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        content: {
            type: Sequelize.TEXT
        },
        star: {
            type: Sequelize.INTEGER
        }
    });

    return Review;
}