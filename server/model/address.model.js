module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define('address', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        country: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        district: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        street: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        detail: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci'
    });

    return Address;
}