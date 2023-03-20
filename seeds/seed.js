const { User, BlogPost, Comment } = require('../models');
const sequelize = require('../config/connection');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');
const commentData = require('./commentData.json');
  
  const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    // create users
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    // Create blog posts
    const blogPosts = await BlogPost.bulkCreate(
      blogPostData.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        userId: users.find(user => user.id === post.user_id).id
      }))
    );  
    // Create comments
    const comments = await Comment.bulkCreate(
      commentData.map(comment => ({
        id: comment.id,
        content: comment.content,
        userId: users.find(user => user.id === comment.user_id).id,
        blogPostId: blogPosts.find(post => post.id === comment.post_id).id
      }))
    );
  
    process.exit(0);
  }
  
  seedDatabase();
  