const env = require('./env');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
 
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = require('../model/user.model')(sequelize, Sequelize);
db.role = require('../model/role.model')(sequelize, Sequelize);
db.profile = require('..//model/profile.model')(sequelize, Sequelize);
db.address = require('../model/address.model')(sequelize, Sequelize);
db.book = require('../model/book.model')(sequelize, Sequelize);
db.review = require('../model/review.model')(sequelize, Sequelize);
db.vote = require('../model/vote.model')(sequelize, Sequelize);
db.request = require('../model/request.model')(sequelize, Sequelize);
db.category = require('../model/category.model')(sequelize, Sequelize);
db.book_user = require('../model/book_user.model')(sequelize, Sequelize);
 
db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId' });
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId' });
db.profile.belongsTo(db.user);
db.profile.belongsTo(db.address);
db.user.hasMany(db.review);
db.book.hasMany(db.review);
db.user.hasMany(db.vote);
db.review.hasMany(db.vote);
db.category.belongsToMany(db.user, { through: 'category_user_favorite', foreignKey:'categoryId', otherKey: 'userId' });
db.user.belongsToMany(db.category, { through: 'category_user_favorite', foreignKey: 'userId', otherKey: 'categoryId' });
db.category.belongsToMany(db.book, { through: 'category_book', foreignKey: 'categoryId', otherKey: 'bookId' });
db.book.belongsToMany(db.category, { through: 'category_book', foreignKey: 'bookId', otherKey: 'categoryId' });
db.user.hasMany(db.book_user);
db.book.hasMany(db.book_user);
db.book_user.hasMany(db.request);

module.exports = db;