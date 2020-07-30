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
                id_user: DataTypes.INTEGER,
                name: DataTypes.STRING,
                message: DataTypes.STRING,
                rating: DataTypes.DOUBLE
            }, {
                modelName: "review",
                sequelize
            });
    }
}

module.exports = Review;