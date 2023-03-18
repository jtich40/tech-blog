const sequelize = require('./config/connection')

// sync connection to db
sequelize.sync()
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((error) => {
    console.error('Unable to sync the models:', error);
  });
