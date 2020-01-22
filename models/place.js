const Sequelize = require('sequelize');

class Place extends Sequelize.Model{
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
                types: DataTypes.STRING,
                area: DataTypes.STRING,
                city: DataTypes.STRING,
                typeId: DataTypes.INTEGER,
                areaId: DataTypes.INTEGER,
                cityId: DataTypes.INTEGER,
                phone: DataTypes.STRING,
                email: DataTypes.STRING,
                url: DataTypes.STRING,
                address: DataTypes.STRING,
                about: DataTypes.STRING,
                time: DataTypes.STRING
            }, {
                modelName: "place",
                sequelize
            });
    }
}

module.exports = Place;