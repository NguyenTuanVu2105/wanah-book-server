module.exports = (sequelize, Sequelize) => {
    const Vote = sequelize.define('votes', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        is_upvote: {
            type: Sequelize.BOOLEAN
        }
    });

    return Vote;
}