const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');

class BlogPost extends Model {}

BlogPost.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'blog_post'
});

BlogPost.belongsTo(User, { foreignKey: 'user_id' });

module.exports = BlogPost;
module.exports = User;
