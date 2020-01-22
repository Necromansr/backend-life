const Sequelize = require('sequelize');

class Review extends Sequelize.Model{
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                id_place: DataTypes.INTEGER,
                name: DataTypes.STRING,
                message: DataTypes.STRING
            }, {
                modelName: "review",
                sequelize
            });
    }
}

module.exports = Review;