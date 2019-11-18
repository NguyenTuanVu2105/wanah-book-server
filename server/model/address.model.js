module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define('address', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        country: {
            type: Sequelize.STRING
        },
        district: {
            type: Sequelize.STRING
        },
        street: {
            type: Sequelize.STRING
        },
        detail: {
            type: Sequelize.STRING
        }
    });

    return Address;
}