const Sequelize = require('sequelize');

class Institution extends Sequelize.Model{
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                id_user: DataTypes.INTEGER,
                image: DataTypes.STRING,
                title: DataTypes.STRING,
                phone: DataTypes.STRING,
                email: DataTypes.STRING,
                address: DataTypes.STRING,
                about: DataTypes.STRING,
                time: DataTypes.STRING,
                price: DataTypes.STRING,
                stock: DataTypes.STRING
            }, {
                modelName: "institution",
                sequelize
            });
    }
}

module.exports = Institution;