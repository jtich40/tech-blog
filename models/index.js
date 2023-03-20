// import all models
const User = require('./user');
const BlogPost = require('./blog_post');
const Comment = require('./comment');

// Define associations between User, BlogPost, and Comment models
User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(BlogPost, { foreignKey: 'user_id' });
BlogPost.belongsTo(User, { foreignKey: 'user_id' });

Comment.belongsTo(BlogPost, { foreignKey: 'post_id' });
BlogPost.hasMany(Comment, { foreignKey: 'post_id' });


module.exports = { User, BlogPost, Comment };
