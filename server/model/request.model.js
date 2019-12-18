module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define('requests', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        request_date: {
            type: Sequelize.DATE
        },
        time_borrow: {
            type: Sequelize.INTEGER
        },
        return_date: {
            type: Sequelize.DATE
        },
        is_accept: {
            type: Sequelize.BOOLEAN
        },
        is_exprired: {
            type: Sequelize.BOOLEAN
        }
    });

    return Request;
};