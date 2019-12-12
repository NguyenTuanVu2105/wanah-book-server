module.exports = (sequelize, Sequelize) => {
	const Message = sequelize.define('messages', {
		id:  { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        content: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
        message_time: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
	});
	
	return Message;
}