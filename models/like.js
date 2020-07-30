const Sequelize = require('sequelize');

class Like extends Sequelize.Model{
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                id_review: DataTypes.INTEGER,
                id_user: DataTypes.INTEGER,
            }, {
                modelName: "like",
                sequelize
            });
    }
}

module.exports = Like;