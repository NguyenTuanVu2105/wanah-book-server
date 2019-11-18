module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define( 'profiles', {
        id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        }
    });
    
    return Profile;
}