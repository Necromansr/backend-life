const Sequelize = require('sequelize');

class User extends Sequelize.Model{
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                email: DataTypes.STRING,
                phone: DataTypes.STRING,
                avatar: DataTypes.STRING,
                password: DataTypes.STRING,
                name: DataTypes.STRING,
                age: DataTypes.STRING,
                city: DataTypes.STRING,
            }, {
                modelName: "user",
                sequelize
            });
    }
}

module.exports = User;