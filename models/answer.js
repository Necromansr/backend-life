const Sequelize = require('sequelize');

class Answer extends Sequelize.Model{
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                id_review: DataTypes.INTEGER,
                name: DataTypes.STRING,
                message: DataTypes.STRING
            }, {
                modelName: "answer",
                sequelize
            });
    }
}

module.exports = Answer;