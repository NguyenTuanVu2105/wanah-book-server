module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
		id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
	  	email: {
		  	type: Sequelize.STRING
	  	},
	  	password: {
		  	type: Sequelize.STRING
		},
		is_Admin: {
			type: Sequelize.STRING
		} 
	});
	
	return User;
}