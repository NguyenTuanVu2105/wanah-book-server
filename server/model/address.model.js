module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define('address', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        detail: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci'
    });

    return Address;
}