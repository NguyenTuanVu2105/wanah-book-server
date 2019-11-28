require('dotenv').config();
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = require('../model/user.model')(sequelize, Sequelize);
db.profile = require('..//model/profile.model')(sequelize, Sequelize);
db.address = require('../model/address.model')(sequelize, Sequelize);
db.book = require('../model/book.model')(sequelize, Sequelize);
db.review = require('../model/review.model')(sequelize, Sequelize);
db.vote = require('../model/vote.model')(sequelize, Sequelize);
db.request = require('../model/request.model')(sequelize, Sequelize);
db.category = require('../model/category.model')(sequelize, Sequelize);
db.book_user = require('../model/book_user.model')(sequelize, Sequelize);
db.author = require('../model/author.model')(sequelize, Sequelize);
 
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
db.category.belongsToMany(db.book, { through: 'author_book', foreignKey: 'authorId', otherKey: 'bookId' });
db.book.belongsToMany(db.author, { through: 'author_book', foreignKey: 'bookId', otherKey: 'authorId' });
db.user.hasMany(db.book_user);
db.book.hasMany(db.book_user);
db.book_user.hasMany(db.request);

module.exports = db;