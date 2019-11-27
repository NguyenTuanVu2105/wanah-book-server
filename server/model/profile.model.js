module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define( 'profiles', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        first_name: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        last_name: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        description: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci'
    });
    
    return Profile;
}