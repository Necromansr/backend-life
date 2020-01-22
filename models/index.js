const Sequelize = require('sequelize');
const User = require('./user'),
Place = require('./place'),
Answer = require('./answer'),
Favorite = require('./favorite'),
History = require('./history'),
Review = require('./review'),
Institution = require('./institution');

const sequelize = new Sequelize('life','root','red1995', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 30,
      min: 5,
      acquire: 30000,
      idle: 10000,
    }
  });

  const models = {
    User: User.init(sequelize, Sequelize),
    Place: Place.init(sequelize,Sequelize),
    Favorite: Favorite.init(sequelize,Sequelize),
    History: History.init(sequelize,Sequelize),
    Review: Review.init(sequelize,Sequelize),
    Institution: Institution.init(sequelize,Sequelize),
    Answer: Answer.init(sequelize,Sequelize)
}
// sequelize.sync({force:true})
//     .then(()=>{
//         console.log(`Database & tables created!`);
//     });
module.exports = {
    ...models,
    sequelize
}