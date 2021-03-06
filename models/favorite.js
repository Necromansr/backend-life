const Sequelize = require('sequelize');

class Favorite extends Sequelize.Model{
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
            }, {
                modelName: "favorite",
                sequelize
            });
    }
}

module.exports = Favorite;